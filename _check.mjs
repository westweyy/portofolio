export default async (page) => {
  await page.waitForSelector('#heroCanvas')
  await page.waitForTimeout(1200)

  await page.evaluate(async () => {
    const step = 500
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 80))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(1500)

  const data = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map((im) => ({
      alt: im.alt.slice(0, 40),
      complete: im.complete,
      nw: im.naturalWidth,
      nh: im.naturalHeight,
      w: Math.round(im.getBoundingClientRect().width),
      h: Math.round(im.getBoundingClientRect().height),
      loading: im.loading
    }))
    const works = [...document.querySelectorAll('.work')].map((w) => {
      const r = w.getBoundingClientRect()
      return { cls: w.className, h: Math.round(r.height), y: Math.round(r.y + scrollY) }
    })
    return {
      imgs,
      broken: imgs.filter((i) => !i.complete || i.nw === 0).length,
      works
    }
  })

  await page.screenshot({ path: 'C:/Users/hp/AppData/Local/Temp/opencode/after-scroll-full.png', fullPage: true })
  return data
}
