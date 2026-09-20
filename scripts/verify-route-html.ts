import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { BASE_URL, routeMeta } from '../src/data/routeMeta.ts'

const distDir = path.join(process.cwd(), 'dist')

function requiredTag(attribute: string, value: string) {
  return `${attribute}="${value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}`
}

async function main() {
  for (const meta of routeMeta) {
    const file = meta.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, meta.path.slice(1), 'index.html')
    const html = await readFile(file, 'utf8')
    const canonical = `${BASE_URL}${meta.path}`
    const expected = [
      `<title>${meta.title.replace(/&/g, '&amp;')}</title>`,
      requiredTag('content', meta.description),
      requiredTag('href', canonical),
      requiredTag('content', meta.title),
      requiredTag('content', canonical),
      requiredTag('content', meta.ogImage),
      requiredTag('content', meta.ogType),
      'name="twitter:card" content="summary_large_image"',
    ]
    for (const value of expected) {
      if (!html.includes(value)) throw new Error(`${meta.path}: missing expected initial HTML value: ${value}`)
    }
    const hasWidth = html.includes('property="og:image:width"')
    const hasHeight = html.includes('property="og:image:height"')
    if (meta.ogImageDimensions) {
      if (!html.includes(`property="og:image:width" content="${meta.ogImageDimensions.width}"`) ||
          !html.includes(`property="og:image:height" content="${meta.ogImageDimensions.height}"`)) {
        throw new Error(`${meta.path}: missing declared OG image dimensions`)
      }
    } else if (hasWidth || hasHeight) {
      throw new Error(`${meta.path}: declares OG image dimensions that are not defined in route metadata`)
    }
    if (meta.path === '/' && (!html.includes('"@type":"Person"') || !html.includes('"@type":"WebSite"'))) {
      throw new Error('/: missing Person or WebSite JSON-LD')
    }
  }
  console.log(`Verified initial HTML metadata for ${routeMeta.length} public routes.`)
}

await main()
