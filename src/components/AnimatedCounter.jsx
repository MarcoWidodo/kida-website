import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  label,
  className = '' 
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(Math.floor(eased * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`text-center ${className}`}
    >
      <div className="font-display text-4xl md:text-5xl font-bold text-cardinal dark:text-cardinal-light">
        {prefix}{count}{suffix}
      </div>
      {label && (
        <div className="mt-2 text-sm text-cool-grey dark:text-fog-dark font-medium uppercase tracking-wider">
          {label}
        </div>
      )}
    </motion.div>
  )
}
