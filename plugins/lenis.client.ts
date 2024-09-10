import Lenis from 'lenis'

export default defineNuxtPlugin({
  name: 'lenis',
  setup() {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  },
  env: {
    islands: false,
  },
})