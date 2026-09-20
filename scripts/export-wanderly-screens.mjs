import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const FILE_KEY = 'f9f4TI5whVyJqqkPhzrQyH'
const TOKEN = process.env.FIGMA_TOKEN

const FRAMES = [
  { id: '296:2688', name: 'home' },
  { id: '133:899', name: 'ai-trip-plan' },
  { id: '181:1213', name: 'explore-activities' },
  { id: '181:1293', name: 'find-a-hotel' },
  { id: '170:409', name: 'buy-now-steps' },
  { id: '181:1590', name: 'wanderly-plus' },
]

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} downloading ${url}`))
          return
        }
        res.pipe(file)
        file.on('finish', () => {
          file.close(resolve)
        })
      })
      .on('error', (err) => {
        fs.unlink(dest, () => reject(err))
      })
  })
}

async function main() {
  if (!TOKEN) {
    console.error('Missing FIGMA_TOKEN. Run with: FIGMA_TOKEN=your_token node scripts/export-wanderly-screens.mjs')
    process.exit(1)
  }

  const ids = FRAMES.map((f) => f.id).join(',')
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`

  const response = await fetch(url, {
    headers: { 'X-Figma-Token': TOKEN },
  })

  if (!response.ok) {
    const body = await response.text()
    console.error(`Figma API error (${response.status}):`, body)
    process.exit(1)
  }

  const data = await response.json()

  if (data.err) {
    console.error('Figma API error:', data.err)
    process.exit(1)
  }

  const outputDir = path.join(ROOT, 'public/images/case-studies/wanderly')
  fs.mkdirSync(outputDir, { recursive: true })

  for (const frame of FRAMES) {
    const imageUrl = data.images?.[frame.id]
    if (!imageUrl) {
      console.log(`No image for ${frame.name} (${frame.id})`)
      continue
    }

    const dest = path.join(outputDir, `screen-${frame.name}.png`)
    await downloadFile(imageUrl, dest)
    console.log(`Downloaded: ${dest}`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
