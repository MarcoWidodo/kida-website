import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'
import { useTheme } from '../App'
import HeroOrb from '../components/HeroOrb'
import BranchCard from '../components/BranchCard'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const branches = [
  {
    branch: 'comms',
    title: 'Communications',
    tagline: 'Amplifying our voice',
    description: 'The Comms Branch amplifies our presence across campus and beyond. From managing social media and newsletters to connecting with the King Center\'s alumni network, the team shares the stories behind our members and initiatives. Whether through outreach, design, or writing, this branch turns ideas into impact and builds KIDA\'s voice in the global development community.'
  },
  {
    branch: 'events',
    title: 'Events',
    tagline: 'Connecting communities',
    description: 'The Events Branch brings the world of international development to Stanford. Through speaker series, policy lunches, and career spotlights, the team curates conversations that inspire and connect. Members engage directly with faculty, practitioners, and alumni while learning how to host thoughtful, high-impact events that shape KIDA\'s community.'
  },
  {
    branch: 'research',
    title: 'Research',
    tagline: 'Curiosity into action',
    description: 'The Research Branch turns curiosity into application. Students collaborate on projects with King Center affiliates, support faculty research, and build KIDA\'s interdisciplinary methods toolkit. Members gain hands-on experience with design thinking, data analysis, and policy writing—learning how evidence-based research can drive real change.'
  },
  {
    branch: 'innovation',
    title: 'Innovation',
    tagline: 'Bold ideas take flight',
    description: 'The Innovation Branch leads KIDA\'s most ambitious initiatives, from datathons to policy design challenges. Members work across disciplines to design creative, high-impact projects in collaboration with the King Center, FSI, and other partners. For those who dream big and love building from scratch, this branch is where bold ideas take off.'
  }
]

const stats = [
  { end: 50, suffix: '+', label: 'Events Hosted' },
  { end: 20, suffix: '+', label: 'Faculty Partners' },
  { end: 4, suffix: '', label: 'Years Active' }
]

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function HomePage() {
  const { darkMode } = useTheme()
  const branchesRef = useRef(null)
  
  const scrollToBranches = () => {
    branchesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-fog-light via-white to-fog-light dark:from-stanford-charcoal dark:via-stanford-black dark:to-stanford-charcoal" />
        
        {/* WebGL Orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
            <HeroOrb darkMode={darkMode} />
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container-narrow text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cardinal/10 text-cardinal dark:text-cardinal-light text-sm font-medium mb-6">
              Stanford University
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-stanford-black dark:text-fog-light mb-6 tracking-tight"
          >
            Stanford's gateway to{' '}
            <span className="gradient-text">global development</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-cool-grey dark:text-fog-dark max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            KIDA bridges the classroom and the world by connecting undergraduates 
            with research, mentorship, and hands-on experiences in international development.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/about" className="btn btn-primary">
              Explore Our Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a 
              href="https://www.instagram.com/stanford.kida/" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Follow @stanford.kida
            </a>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToBranches}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone dark:text-stone-light hover:text-cardinal dark:hover:text-cardinal-light transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-wider">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>
      
      {/* Stats Section */}
      <section className="section bg-white dark:bg-stanford-black">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-4">
                What We Do
              </h2>
              <p className="text-cool-grey dark:text-fog-dark max-w-2xl mx-auto">
                KIDA is Stanford's hub for students driven to tackle global development challenges. 
                We connect undergraduates with research, mentorship, and hands-on experiences.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Branches Section */}
      <section ref={branchesRef} className="section bg-fog-light dark:bg-stanford-charcoal">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-cardinal/10 text-cardinal dark:text-cardinal-light text-sm font-medium mb-4">
                Our Branches
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-4">
                Four ways to make an impact
              </h2>
              <p className="text-cool-grey dark:text-fog-dark max-w-2xl mx-auto">
                Each branch offers a unique pathway into the world of global development. 
                Hover over a card to learn more.
              </p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer 
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {branches.map((branch) => (
              <StaggerItem key={branch.branch}>
                <BranchCard {...branch} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* King Center Partnership Section */}
      <section className="section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/STANFORD_JPEGS00472.jpg)' }}
        />
        <div className="absolute inset-0 bg-stanford-black/80 dark:bg-stanford-black/90" />
        
        <div className="relative z-10 container-narrow text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-fog-light text-sm font-medium mb-6">
              In Partnership With
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fog-light mb-6">
              King Center for Global Development
            </h2>
            <p className="text-fog-dark max-w-2xl mx-auto mb-8 leading-relaxed">
              KIDA serves as the undergraduate gateway into the King Center ecosystem. 
              Our partnership provides students with unparalleled access to leading faculty, 
              cutting-edge research, and a global network of development practitioners.
            </p>
            <a
              href="https://kingcenter.stanford.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-stanford-black hover:bg-fog-light"
            >
              Visit the King Center
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-white dark:bg-stanford-black noise">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-stanford-black dark:text-fog-light mb-6">
              Ready to make an impact?
            </h2>
            <p className="text-cool-grey dark:text-fog-dark max-w-xl mx-auto mb-8">
              Join a community of students passionate about global development. 
              Follow us on Instagram to stay updated on events and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/stanford.kida/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Follow @stanford.kida
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
