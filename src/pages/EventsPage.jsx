import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, User, Filter, ChevronDown } from 'lucide-react'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import eventsData from '../../data/events.json'

const branchColors = {
  comms: 'bg-comms/10 text-comms border-comms/30',
  events: 'bg-events/10 text-events border-events/30',
  research: 'bg-research/10 text-research border-research/30',
  innovation: 'bg-innovation/10 text-innovation border-innovation/30'
}

const typeColors = {
  speaker: 'bg-cardinal/10 text-cardinal',
  workshop: 'bg-research/10 text-research',
  panel: 'bg-events/10 text-events',
  special: 'bg-innovation/10 text-innovation'
}

function EventCard({ event }) {
  const [imageError, setImageError] = useState(false)
  const isPast = event.past || new Date(event.date) < new Date()
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`card-elevated overflow-hidden group ${isPast ? 'opacity-75' : ''}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageError ? (
          <img 
            src={event.image}
            alt={event.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-fog dark:bg-stone-dark flex items-center justify-center">
            <Calendar className="w-12 h-12 text-stone/50" />
          </div>
        )}
        
        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
            {eventsData.eventTypes[event.type]?.label || event.type}
          </span>
        </div>
        
        {/* Past event overlay */}
        {isPast && (
          <div className="absolute inset-0 bg-stanford-black/40 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/90 dark:bg-stanford-charcoal/90 rounded-full text-sm font-medium">
              Past Event
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Branch tag */}
        <div className="mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${branchColors[event.branch]}`}>
            {event.branch.charAt(0).toUpperCase() + event.branch.slice(1)}
          </span>
        </div>
        
        <h3 className="font-display text-lg font-bold text-stanford-black dark:text-fog-light mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-cool-grey dark:text-fog-dark text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>
        
        {/* Meta info */}
        <div className="space-y-2 text-sm text-stone dark:text-stone-light">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{event.speaker}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function EventsPage() {
  const [filter, setFilter] = useState('all')
  const [branchFilter, setBranchFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const filteredEvents = eventsData.events.filter(event => {
    const isPast = event.past || new Date(event.date) < new Date()
    
    // Time filter
    if (filter === 'upcoming' && isPast) return false
    if (filter === 'past' && !isPast) return false
    
    // Branch filter
    if (branchFilter !== 'all' && event.branch !== branchFilter) return false
    
    return true
  }).sort((a, b) => {
    // Sort by date, upcoming first
    const aIsPast = a.past || new Date(a.date) < new Date()
    const bIsPast = b.past || new Date(b.date) < new Date()
    
    if (aIsPast !== bIsPast) return aIsPast ? 1 : -1
    return new Date(b.date) - new Date(a.date)
  })
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-white dark:bg-stanford-black">
        <div className="container-wide">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 rounded-full bg-cardinal/10 text-cardinal dark:text-cardinal-light text-sm font-medium mb-6">
              Events
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-stanford-black dark:text-fog-light mb-6">
              Events Archive
            </h1>
            <p className="text-lg text-cool-grey dark:text-fog-dark max-w-2xl leading-relaxed">
              Explore our speaker series, workshops, panels, and special events. 
              From policy lunches to datathons, discover how KIDA brings global development to Stanford.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white/80 dark:bg-stanford-black/80 backdrop-blur-xl border-b border-fog dark:border-stone-dark/30">
        <div className="container-wide py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Time Filter */}
            <div className="flex items-center gap-2">
              {['all', 'upcoming', 'past'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === option
                      ? 'bg-cardinal text-white'
                      : 'bg-fog/50 dark:bg-stone-dark/30 text-stanford-black dark:text-fog-light hover:bg-fog dark:hover:bg-stone-dark/50'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Branch Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-fog/50 dark:bg-stone-dark/30 text-stanford-black dark:text-fog-light hover:bg-fog dark:hover:bg-stone-dark/50 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by Branch</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Branch Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4">
                  {['all', 'comms', 'events', 'research', 'innovation'].map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setBranchFilter(branch)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        branchFilter === branch
                          ? branch === 'all' 
                            ? 'bg-stanford-black dark:bg-fog-light text-white dark:text-stanford-black border-transparent'
                            : `${branchColors[branch]} border-current`
                          : 'bg-transparent border-fog dark:border-stone-dark text-stanford-black dark:text-fog-light hover:bg-fog/50 dark:hover:bg-stone-dark/30'
                      }`}
                    >
                      {branch === 'all' ? 'All Branches' : branch.charAt(0).toUpperCase() + branch.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Events Grid */}
      <section className="section bg-fog-light dark:bg-stanford-charcoal">
        <div className="container-wide">
          {filteredEvents.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-stone/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-stanford-black dark:text-fog-light mb-2">
                No events found
              </h3>
              <p className="text-cool-grey dark:text-fog-dark">
                Try adjusting your filters to see more events.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="section bg-white dark:bg-stanford-black">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-6">
              Never miss an event
            </h2>
            <p className="text-cool-grey dark:text-fog-dark max-w-xl mx-auto mb-8">
              Follow us on Instagram to stay updated on upcoming events, 
              speaker announcements, and opportunities to get involved.
            </p>
            <a
              href="https://www.instagram.com/stanford.kida/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Follow @stanford.kida
            </a>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
