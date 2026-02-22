import { useEffect, useRef } from 'react'

/**
 * Returns a ref. When the element enters the viewport,
 * it removes 'anim-hidden' and adds the provided animClass.
 */
export function useScrollReveal(animClass = 'animate-fade-up', threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('anim-hidden')
          el.classList.add(animClass)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animClass, threshold])

  return ref
}
