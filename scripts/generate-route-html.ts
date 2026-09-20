import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { BASE_URL, DEFAULT_OG_IMAGE, routeMeta, type RouteMeta } from '../src/data/routeMeta.ts'
import { homepageStructuredData } from '../src/data/structuredData.ts'

const projectRoot = process.cwd()
const distDir = path.join(projectRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const startMarker = '<!-- ROUTE_META_START -->'
const endMarker = '<!-- ROUTE_META_END -->'

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function jsonLdTag(data: object) {
  return `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function metadataBlock(meta: RouteMeta) {
  const canonical = `${BASE_URL}${meta.path}`
  const lines = [
    '    <!-- Route-specific SEO: generated from src/data/routeMeta.ts -->',
    `    <title>${escapeHtml(meta.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(meta.description)}" />`,
    '    <meta name="author" content="Usman Zahid Farooqi" />',
    '    <meta name="robots" content="index, follow" />',
    `    <link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `    <meta property="og:type" content="${meta.ogType}" />`,
    '    <meta property="og:site_name" content="Usman Zahid Farooqi" />',
    `    <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `    <meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    '    <meta property="og:image:alt" content="Usman Zahid Farooqi — Senior Product Designer" />',
    '    <meta property="og:locale" content="en_US" />',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
    '    <meta name="twitter:image:alt" content="Usman Zahid Farooqi — Senior Product Designer" />',
  ]

  if (meta.ogImageDimensions) {
    lines.splice(12, 0,
      `    <meta property="og:image:width" content="${meta.ogImageDimensions.width}" />`,
      `    <meta property="og:image:height" content="${meta.ogImageDimensions.height}" />`,
    )
  }

  if (meta.path === '/') lines.push(...homepageStructuredData.map(jsonLdTag))
  return lines.join('\n')
}

async function assertPublicAssetExists(url: string) {
  if (!url.startsWith(`${BASE_URL}/`)) throw new Error(`Metadata image must be an absolute ${BASE_URL} URL: ${url}`)
  const publicPath = path.join(projectRoot, 'public', new URL(url).pathname)
  try {
    await access(publicPath, constants.R_OK)
  } catch {
    throw new Error(`Required metadata image is missing: ${publicPath}`)
  }
}

async function main() {
  await assertPublicAssetExists(DEFAULT_OG_IMAGE)
  await Promise.all(routeMeta.map((meta) => assertPublicAssetExists(meta.ogImage)))

  const template = await readFile(templatePath, 'utf8')
  const markerPattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`)
  if (!markerPattern.test(template)) throw new Error('dist/index.html is missing route metadata markers')

  await Promise.all(routeMeta.map(async (meta) => {
    const html = template.replace(markerPattern, `${startMarker}\n${metadataBlock(meta)}\n    ${endMarker}`)
    const outputPath = meta.path === '/'
      ? templatePath
      : path.join(distDir, meta.path.slice(1), 'index.html')
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html)
  }))

  console.log(`Generated route HTML for ${routeMeta.length} public routes.`)
}

await main()
