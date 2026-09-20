/**
 * Fetches project thumbnails from the Figma REST API, resizes them to
 * 808 × 632 (Behance standard project-cover ratio), and writes
 * .webp files to public/images/projects/<id>_1x.webp
 *
 * Usage: npm run generate-thumbnails
 * Token: https://www.figma.com/settings → Personal access tokens
 * Set FIGMA_ACCESS_TOKEN in .env.local (or .env)
 *
 * Projects whose image field already points to /images/projects/new/
 * are skipped by the Figma fetch but their source PNG is still converted
 * and saved to the standard path so everything uses one consistent format.
 */

import dotenv from 'dotenv'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'
import { projects } from '../src/data/projects'
import { FigmaService } from '../src/services/figmaService'

const THUMB_W = 808
const THUMB_H = 632
const OUT_DIR = resolve(process.cwd(), 'public/images/projects')
const NEW_DIR = resolve(process.cwd(), 'public/images/projects/new')

const root = process.cwd()
dotenv.config({ path: resolve(root, '.env.local') })
dotenv.config({ path: resolve(root, '.env') })

/** Download a URL to a Buffer */
async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

/** Convert any image buffer or file path → 808×632 webp covering the full rect */
async function toWebP(input: Buffer | string): Promise<Buffer> {
  return sharp(input)
    .resize(THUMB_W, THUMB_H, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85 })
    .toBuffer()
}

function outPath(projectId: string): string {
  return resolve(OUT_DIR, `${projectId.replace(/-/g, '_')}_1x.webp`)
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const token = process.env.FIGMA_ACCESS_TOKEN ?? process.env.VITE_FIGMA_ACCESS_TOKEN

  // ── Pass A: convert manually-supplied PNGs from /new/ ─────────────────────
  console.log('\n📁  Converting manually-supplied thumbnails from /new/ …')
  for (const project of projects) {
    if (!project.image.startsWith('/images/projects/new/')) continue
    const srcFilename = project.image.replace('/images/projects/new/', '')
    const srcPath = resolve(NEW_DIR, srcFilename)
    if (!existsSync(srcPath)) {
      console.warn(`  ✗ ${project.id} — source file not found: ${srcPath}`)
      continue
    }
    const webp = await toWebP(srcPath)
    await writeFile(outPath(project.id), webp)
    console.log(`  ✓ ${project.id}  →  ${THUMB_W}×${THUMB_H} webp`)
  }

  // ── Pass B: fetch from Figma API ───────────────────────────────────────────
  if (!token) {
    console.warn(
      '\n⚠️  FIGMA_ACCESS_TOKEN not set — skipping Figma fetch.\n' +
        '   Add FIGMA_ACCESS_TOKEN=figd_... to .env.local to regenerate\n' +
        '   thumbnails for projects that use Figma embed URLs.\n',
    )
    return
  }

  const figma = new FigmaService(token)

  type Job = { projectId: string; fileKey: string; nodeId: string }
  const jobs: Job[] = []

  for (const project of projects) {
    if (project.image.startsWith('/images/projects/new/')) continue

    const sourceUrl = figma.getSourceUrl(project)
    if (!sourceUrl) continue

    const fileKey = figma.extractFileKey(sourceUrl)
    const nodeId = figma.extractNodeId(sourceUrl)

    if (!fileKey || !nodeId) {
      console.warn(`  ⚠️  Could not parse Figma URL for: ${project.id}`)
      continue
    }

    jobs.push({ projectId: project.id, fileKey, nodeId })
  }

  const byFile = new Map<string, Job[]>()
  for (const job of jobs) {
    const list = byFile.get(job.fileKey) ?? []
    list.push(job)
    byFile.set(job.fileKey, list)
  }

  console.log(`\n🎨  Fetching ${jobs.length} thumbnails from Figma …`)

  for (const [fileKey, fileJobs] of byFile) {
    // Fetch at scale=2 for plenty of pixels before cropping to 808×632
    const nodeIds = [...new Set(fileJobs.map((j) => j.nodeId))]
    const images = await figma.getThumbnailsBatch(fileKey, nodeIds, 2)

    for (const job of fileJobs) {
      const url = images[job.nodeId]
      if (!url) {
        console.warn(`  ✗ ${job.projectId} (no image returned from Figma)`)
        continue
      }

      try {
        const buf = await fetchBuffer(url)
        const webp = await toWebP(buf)
        await writeFile(outPath(job.projectId), webp)
        console.log(`  ✓ ${job.projectId}`)
      } catch (err) {
        console.warn(`  ✗ ${job.projectId}: ${(err as Error).message}`)
      }
    }

    await new Promise((r) => setTimeout(r, 400))
  }

  console.log(`\n✅  Done — thumbnails saved to public/images/projects/\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
