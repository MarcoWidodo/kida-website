import { motion } from 'framer-motion'
import { Target, Users, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to bridge the gap between academic learning and real-world development impact, empowering students to become thoughtful practitioners.'
  },
  {
    icon: Users,
    title: 'Community-Centered',
    description: 'We build meaningful connections between students, faculty, and practitioners, fostering a supportive network for aspiring development professionals.'
  },
  {
    icon: BookOpen,
    title: 'Research-Oriented',
    description: 'We believe in evidence-based approaches. Our work emphasizes rigorous methods, data literacy, and critical thinking about development challenges.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation-Focused',
    description: 'We encourage creative problem-solving and ambitious projects, giving students the space to experiment and lead transformative initiatives.'
  }
]

const timeline = [
  {
    year: '2021',
    title: 'Foundation',
    description: 'KIDA was founded by a small group of undergraduates passionate about global development and eager to connect with the King Center.'
  },
  {
    year: '2022',
    title: 'First Major Event',
    description: 'Hosted our inaugural Development Policy Lunch series, bringing faculty and practitioners to campus for intimate conversations.'
  },
  {
    year: '2023',
    title: 'Branch Expansion',
    description: 'Formalized our four-branch structure, enabling more specialized programming and leadership opportunities for members.'
  },
  {
    year: '2024',
    title: 'Innovation Launch',
    description: 'Launched our first Datathon in partnership with the King Center, challenging students to analyze real development data.'
  },
  {
    year: '2025',
    title: 'Growing Impact',
    description: 'Expanding research collaborations and building lasting institutional partnerships across Stanford and beyond.'
  }
]

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function AboutPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white dark:bg-stanford-black">
        <div className="container-narrow">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 rounded-full bg-cardinal/10 text-cardinal dark:text-cardinal-light text-sm font-medium mb-6">
              About KIDA
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-stanford-black dark:text-fog-light mb-6">
              Bridging classroom and world
            </h1>
            <p className="text-lg text-cool-grey dark:text-fog-dark max-w-2xl leading-relaxed">
              KIDA—the King International Development Association—is Stanford's student-led 
              organization dedicated to preparing undergraduates for careers in global development. 
              We connect students with research opportunities, mentorship, and hands-on experiences 
              that translate academic knowledge into real-world impact.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Image Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/IFMR__April_2014_084.JPG)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stanford-black/50 to-transparent" />
      </section>
      
      {/* Mission & Values */}
      <section className="section bg-fog-light dark:bg-stanford-charcoal">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-4">
                Our Values
              </h2>
              <p className="text-cool-grey dark:text-fog-dark max-w-2xl mx-auto">
                Everything we do is guided by these core principles.
              </p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer 
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="card-elevated p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-cardinal/10 dark:bg-cardinal/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-cardinal dark:text-cardinal-light" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-stanford-black dark:text-fog-light mb-3">
                    {value.title}
                  </h3>
                  <p className="text-cool-grey dark:text-fog-dark leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* Constitutional Grounding */}
      <section className="section bg-white dark:bg-stanford-black">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="fadeRight">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-6">
                  Rooted in Partnership
                </h2>
                <p className="text-cool-grey dark:text-fog-dark leading-relaxed mb-4">
                  KIDA operates as a constitutionally grounded student organization with deep ties to 
                  the King Center for Global Development. This partnership ensures our programming 
                  aligns with Stanford's broader development research agenda while maintaining 
                  student leadership and autonomy.
                </p>
                <p className="text-cool-grey dark:text-fog-dark leading-relaxed mb-6">
                  Our governance structure emphasizes collaborative decision-making, with officer 
                  consensus driving most initiatives and co-presidents providing final guidance 
                  on strategic matters.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Learn How to Join
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeLeft" delay={0.2}>
              <div className="relative">
                <img 
                  src="/images/kutch_061.JPG" 
                  alt="Development fieldwork"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl hidden md:block">
                  <img 
                    src="/images/PVP_9031.jpg" 
                    alt="Research collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="section bg-fog-light dark:bg-stanford-charcoal">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-4">
                Our Journey
              </h2>
              <p className="text-cool-grey dark:text-fog-dark max-w-2xl mx-auto">
                From a small group of passionate students to a thriving community.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-fog dark:bg-stone-dark transform md:-translate-x-px" />
            
            {timeline.map((item, index) => (
              <ScrollReveal 
                key={item.year}
                delay={index * 0.1}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year bubble */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 bg-cardinal rounded-full flex items-center justify-center z-10 shadow-lg">
                  <span className="text-white font-bold text-sm">{item.year}</span>
                </div>
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-bold text-stanford-black dark:text-fog-light mb-2">
                      {item.title}
                    </h3>
                    <p className="text-cool-grey dark:text-fog-dark text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-cardinal">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Join our community
            </h2>
            <p className="text-cardinal-light/80 max-w-xl mx-auto mb-8">
              Whether you're interested in research, events, communications, or innovation, 
              there's a place for you at KIDA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/stanford.kida/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-cardinal hover:bg-fog-light"
              >
                Follow @stanford.kida
              </a>
              <Link to="/events" className="btn border-2 border-white text-white hover:bg-white/10">
                View Our Events
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
