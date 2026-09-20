/**
 * Import a Behance project into local case-study assets + a blocks manifest.
 *
 * Behance rate-limits anonymous HTML fetches (HTTP 429). Prefer:
 *   1) Paste a project dump at scripts/data/<slug>-behance.json (from the page's
 *      #beconfig-store_state), OR
 *   2) Pass --from-json pointing at that file.
 *
 * Usage:
 *   npx tsx scripts/import-behance.ts --from-json scripts/data/wanderly-behance.json --slug wanderly
 *
 * Downloads land in public/images/case-studies/<slug>/behance/
 * and a blocks.json is written next to them for wiring into caseStudies.ts.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'

type Module = {
  i: number
  id: number
  type: string
  src?: string
  html?: string
  videoSrc?: string
  images?: string[]
}

type Manifest = {
  id: number
  name: string
  description: string
  tags: string[]
  tools: string[]
  cover?: string
  modules: Module[]
}

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(name)
  return idx >= 0 ? process.argv[idx + 1] : undefined
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function download(url: string, dest: string): Promise<number> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Referer: 'https://www.behance.net/',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  return buf.length
}

async function main() {
  const fromJson = arg('--from-json')
  const slug = arg('--slug') ?? 'imported'

  if (!fromJson) {
    console.error(
      'Missing --from-json. Behance blocks anonymous scrapes; dump #beconfig-store_state first.',
    )
    process.exit(1)
  }

  const root = process.cwd()
  const manifest = JSON.parse(await readFile(resolve(root, fromJson), 'utf8')) as Manifest
  const outDir = resolve(root, 'public/images/case-studies', slug, 'behance')
  await mkdir(outDir, { recursive: true })

  const publicBase = `/images/case-studies/${slug}/behance`
  const blocks: Array<Record<string, unknown>> = []
  let n = 0
  const id = (prefix: string) => `${slug}-bh-${prefix}-${++n}`

  if (manifest.cover) {
    const name = `cover${extname(new URL(manifest.cover).pathname) || '.png'}`
    process.stdout.write(`cover → ${name}… `)
    const bytes = await download(manifest.cover, resolve(outDir, name))
    console.log(`${(bytes / 1024).toFixed(0)} KB`)
  }

  for (const mod of manifest.modules) {
    if (mod.type === 'ImageModule' && mod.src) {
      const ext = extname(new URL(mod.src).pathname) || '.jpg'
      const name = `module-${String(mod.i).padStart(2, '0')}${ext}`
      process.stdout.write(`${name}… `)
      const bytes = await download(mod.src, resolve(outDir, name))
      console.log(`${(bytes / 1024).toFixed(0)} KB`)
      blocks.push({
        type: 'image',
        id: id('img'),
        src: `${publicBase}/${name}`,
        width: 'full',
        zoom: true,
      })
    } else if (mod.type === 'MediaCollectionModule') {
      const images: string[] = []
      for (const [j, url] of (mod.images ?? []).entries()) {
        const ext = extname(new URL(url).pathname) || '.png'
        const name = `module-${String(mod.i).padStart(2, '0')}-c${j}${ext}`
        process.stdout.write(`${name}… `)
        const bytes = await download(url, resolve(outDir, name))
        console.log(`${(bytes / 1024).toFixed(0)} KB`)
        images.push(`${publicBase}/${name}`)
      }
      if (images.length === 1) {
        blocks.push({
          type: 'image',
          id: id('img'),
          src: images[0],
          width: 'full',
          zoom: true,
        })
      } else if (images.length > 1) {
        blocks.push({
          type: 'image-grid',
          id: id('grid'),
          columns: images.length >= 3 ? 3 : 2,
          images: images.map((src) => ({ src })),
        })
      }
    } else if (mod.type === 'TextModule' && mod.html) {
      const text = stripHtml(mod.html)
      if (!text || /thank you|website\s*\|/i.test(text)) continue
      const isTitle = text.length < 60
      blocks.push(
        isTitle
          ? { type: 'heading', id: id('h'), content: text, level: 2 }
          : { type: 'text', id: id('t'), content: text, size: 'md' },
      )
    } else if (mod.type === 'VideoModule' && mod.videoSrc) {
      blocks.push({
        type: 'embed',
        id: id('vid'),
        src: mod.videoSrc,
        title: `${manifest.name} video`,
        aspectRatio: '16 / 9',
      })
    }
  }

  await writeFile(resolve(outDir, 'blocks.json'), JSON.stringify(blocks, null, 2))
  await writeFile(
    resolve(outDir, 'meta.json'),
    JSON.stringify(
      {
        behanceId: manifest.id,
        name: manifest.name,
        description: manifest.description,
        tags: manifest.tags,
        tools: manifest.tools,
        source: `https://www.behance.net/gallery/${manifest.id}`,
      },
      null,
      2,
    ),
  )

  console.log(`\n✅  ${blocks.length} blocks → ${outDir}/blocks.json`)
  console.log(`    Wire into caseStudies.ts as caseStudy.blocks`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
