import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'img', 'projects')

const SITES = [
  { id: 'oaklet-store',          url: 'https://oaklet-store.vercel.app' },
  { id: 'kaltansky-modern',      url: 'https://pozhidaevnikita2743-arch.github.io/kaltansky-modern/' },
  { id: 'kaltansky-corporate',   url: 'https://pozhidaevnikita2743-arch.github.io/kaltansky-corporate/' },
  { id: 'photo-site-3',          url: 'https://pozhidaevnikita2743-arch.github.io/photo-site-3.0/' },
  { id: 'photo-site-multilang',  url: 'https://pozhidaevnikita2743-arch.github.io/PHOTOSITE-on-3lng-2.0/' },
]

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const { id, url } of SITES) {
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise(r => setTimeout(r, 1000))
    const out = path.join(OUT, `${id}.jpg`)
    await page.screenshot({ path: out, type: 'jpeg', quality: 82 })
    console.log(`  OK ${id}.jpg`)
    await page.close()
  } catch (e) {
    console.log(`  FAIL ${id}: ${e.message}`)
  }
}

await browser.close()
console.log('Done.')
