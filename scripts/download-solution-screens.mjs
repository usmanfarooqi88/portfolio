import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const screens = [
  {
    url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2e7ccf36-c2bf-42bc-ab15-7fc1e115fc4c',
    filename: 'screen-discover.png',
  },
  {
    url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/99bbbf77-a5f7-4e9c-9e32-10225169dd18',
    filename: 'screen-ai-planner.png',
  },
  {
    url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c5337893-effb-45eb-a2c0-eb3540e5f702',
    filename: 'screen-booking.png',
  },
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
  const outputDir = path.join(ROOT, 'public/images/case-studies/wanderly')
  fs.mkdirSync(outputDir, { recursive: true })

  for (const screen of screens) {
    const dest = path.join(outputDir, screen.filename)
    await downloadFile(screen.url, dest)
    console.log(`✓ Saved: ${dest}`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
