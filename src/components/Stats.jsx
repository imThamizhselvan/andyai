import { useEffect, useState, useRef } from 'react'
import AnimatedSection from './AnimatedSection'

const stats = [
  { value: 100, suffix: '%', label: 'Calls Answered' },
  { value: 50, suffix: '%', label: 'Cost Savings vs Receptionist' },
  { value: 24, suffix: '/7', label: 'Always Available' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
