import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calendar, Search, Lightbulb, ChevronDown } from 'lucide-react'

const branchIcons = {
  comms: MessageSquare,
  events: Calendar,
  research: Search,
  innovation: Lightbulb
}

const branchColors = {
  comms: {
    bg: 'bg-comms/10 dark:bg-comms/20',
    text: 'text-comms dark:text-comms-light',
    border: 'border-comms/30 hover:border-comms',
    glow: 'hover:shadow-comms/20'
  },
  events: {
    bg: 'bg-events/10 dark:bg-events/20',
    text: 'text-events dark:text-events-light',
    border: 'border-events/30 hover:border-events',
    glow: 'hover:shadow-events/20'
  },
  research: {
    bg: 'bg-research/10 dark:bg-research/20',
    text: 'text-research dark:text-research-light',
    border: 'border-research/30 hover:border-research',
    glow: 'hover:shadow-research/20'
  },
  innovation: {
    bg: 'bg-innovation/10 dark:bg-innovation/20',
    text: 'text-innovation dark:text-innovation-light',
    border: 'border-innovation/30 hover:border-innovation',
    glow: 'hover:shadow-innovation/20'
  }
}

export default function BranchCard({ branch, title, tagline, description }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = branchIcons[branch]
  const colors = branchColors[branch]
  
  return (
    <motion.div
      layout
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
      tabIndex={0}
      className={`
        card-elevated p-6 cursor-pointer transition-all duration-300
        border-2 ${colors.border} ${colors.glow} hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cardinal
      `}
    >
      {/* Icon */}
      <motion.div 
        layout
        className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4`}
      >
        <Icon className={`w-7 h-7 ${colors.text}`} />
      </motion.div>
      
      {/* Title */}
      <motion.h3 
        layout
        className="font-display text-xl font-bold text-stanford-black dark:text-fog-light mb-2"
      >
        {title}
      </motion.h3>
      
      {/* Tagline */}
      <motion.p 
        layout
        className={`text-sm font-medium ${colors.text} mb-3`}
      >
        {tagline}
      </motion.p>
      
      {/* Expand indicator */}
      <motion.div 
        layout
        className="flex items-center gap-1 text-xs text-stone dark:text-stone-light"
      >
        <span>Learn more</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
      
      {/* Expanded Description */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-fog dark:border-stone-dark/30">
              <p className="text-cool-grey dark:text-fog-dark leading-relaxed text-sm">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
