import { motion } from 'framer-motion'
import { Mail, Instagram, MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For general inquiries, partnership opportunities, or questions about joining.',
    action: 'stanford.kida@gmail.com',
    href: 'mailto:stanford.kida@gmail.com',
    color: 'cardinal'
  },
  {
    icon: Instagram,
    title: 'Follow Us',
    description: 'Stay updated on events, announcements, and behind-the-scenes content.',
    action: '@stanford.kida',
    href: 'https://www.instagram.com/stanford.kida/',
    external: true,
    color: 'events'
  }
]

const faqs = [
  {
    question: 'How do I join KIDA?',
    answer: 'KIDA welcomes all Stanford undergraduates interested in global development. Follow us on Instagram for announcements about recruitment periods and info sessions, or reach out via email to express your interest.'
  },
  {
    question: 'Do I need prior experience in development?',
    answer: 'No prior experience is required! KIDA is designed to help you build skills and knowledge. We welcome students from all backgrounds and majors who are curious about global development challenges.'
  },
  {
    question: 'How can faculty or practitioners get involved?',
    answer: 'We love connecting with King Center affiliates and development practitioners. Please email us to discuss speaking opportunities, research collaborations, or mentorship possibilities.'
  },
  {
    question: 'What is KIDA\'s relationship with the King Center?',
    answer: 'KIDA serves as the undergraduate gateway to the King Center for Global Development. We work closely with King Center staff and affiliates to create programming that connects students with faculty research and professional opportunities.'
  },
  {
    question: 'How much time commitment is expected?',
    answer: 'Time commitment varies by role and branch. General members can engage as their schedule allows, while branch officers typically commit a few hours per week. We prioritize flexibility and understand that academics come first.'
  }
]

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function ContactPage() {
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
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-stanford-black dark:text-fog-light mb-6">
              Get in touch
            </h1>
            <p className="text-lg text-cool-grey dark:text-fog-dark max-w-2xl leading-relaxed">
              Whether you're a student interested in joining, a faculty member looking to collaborate, 
              or an organization seeking partnership, we'd love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Contact Methods */}
      <section className="section bg-fog-light dark:bg-stanford-charcoal">
        <div className="container-narrow">
          <StaggerContainer 
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {contactMethods.map((method) => (
              <StaggerItem key={method.title}>
                <a
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="card-elevated p-8 h-full flex flex-col group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${method.color}/10 dark:bg-${method.color}/20 flex items-center justify-center mb-6`}>
                    <method.icon className={`w-7 h-7 text-${method.color} dark:text-${method.color}-light`} />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-stanford-black dark:text-fog-light mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-cool-grey dark:text-fog-dark leading-relaxed mb-6 flex-grow">
                    {method.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-cardinal dark:text-cardinal-light font-medium">
                    <span>{method.action}</span>
                    {method.external ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {/* Location info */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 card-elevated p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-research/10 dark:bg-research/20 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-7 h-7 text-research dark:text-research-light" />
              </div>
              <h3 className="font-display text-xl font-bold text-stanford-black dark:text-fog-light mb-3">
                Find Us on Campus
              </h3>
              <p className="text-cool-grey dark:text-fog-dark leading-relaxed max-w-md mx-auto">
                KIDA events are typically held at Encina Hall, the Freeman Spogli Institute, 
                and various locations across Stanford's campus. Check specific event listings for details.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-white dark:bg-stanford-black">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stanford-black dark:text-fog-light mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-cool-grey dark:text-fog-dark">
                Quick answers to common questions about KIDA.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="card p-6">
                  <h3 className="font-display text-lg font-bold text-stanford-black dark:text-fog-light mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-cool-grey dark:text-fog-dark leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="section bg-cardinal">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to connect?
            </h2>
            <p className="text-cardinal-light/80 max-w-xl mx-auto mb-8">
              We're always looking for passionate students, thoughtful collaborators, 
              and inspiring speakers. Don't hesitate to reach out.
            </p>
            <a
              href="mailto:stanford.kida@gmail.com"
              className="btn bg-white text-cardinal hover:bg-fog-light"
            >
              Email Us Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
