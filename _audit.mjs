export default async (page) => {
  await page.waitForSelector('#heroCanvas')
  await page.waitForTimeout(1800)

  const audit = () =>
    page.evaluate(() => {
      const rect = (el) => {
        const r = el.getBoundingClientRect()
        return {
          x: Math.round(r.x),
          y: Math.round(r.y + scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height)
        }
      }
      const info = (el) => {
        const cs = getComputedStyle(el)
        const r = rect(el)
        return {
          sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
          ...r,
          display: cs.display,
          overflowX: el.scrollWidth - el.clientWidth,
          overflowY: el.scrollHeight - el.clientHeight,
          clipped: cs.overflow === 'hidden' && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)
        }
      }
      const sels = [
        '.hero', '.hero-cap', '#contents', '.contents-grid', '.contents-intro', '.index',
        '#hello', '.hello', '.device', '#works-intro', '#works', '.work',
        '#workflow', '#lab', '.loops', '.loop', '.loop-stage', '.sphere', '.ring', '.cube',
        '#contact', '.stage', 'footer'
      ]
      const boxes = {}
      for (const s of sels) {
        const el = document.querySelector(s)
        if (el) boxes[s] = info(el)
      }
      const over = []
      for (const el of document.querySelectorAll('h1,h2,h3,p,a,li,figure,img,span,div')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        if (r.right > innerWidth + 1 || r.left < -1) {
          over.push({ tag: el.tagName, cls: String(el.className).slice(0, 60), ...rect(el), right: Math.round(r.right), left: Math.round(r.left) })
        }
      }
      return {
        viewport: `${innerWidth}x${innerHeight}`,
        docW: document.documentElement.scrollWidth,
        docH: document.documentElement.scrollHeight,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        boxes,
        offscreenX: over.slice(0, 12)
      }
    })

  const out = {}
  for (const size of [
    [1440, 900],
    [1280, 720],
    [1024, 768],
    [820, 1180],
    [768, 1024],
    [430, 932],
    [390, 844],
    [360, 800]
  ]) {
    await page.setViewportSize({ width: size[0], height: size[1] })
    await page.waitForTimeout(500)
    out[size.join('x')] = await audit()
  }

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'C:/Users/hp/AppData/Local/Temp/opencode/audit-full.png', fullPage: true })
  for (const [id, path] of [
    ['#tech-none', ''],
    ['#contents', 'C:/Users/hp/AppData/Local/Temp/opencode/audit-contents.png'],
    ['#lab', 'C:/Users/hp/AppData/Local/Temp/opencode/audit-lab.png'],
    ['#works-intro', 'C:/Users/hp/AppData/Local/Temp/opencode/audit-worksintro.png']
  ]) {
    if (!path) continue
    const el = page.locator(id)
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(600)
      await el.screenshot({ path }).catch(() => {})
    }
  }

  return out
}
