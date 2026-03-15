import { Link } from 'react-router-dom'
import { Instagram, Mail, ExternalLink } from 'lucide-react'

const footerLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' }
]

const socialLinks = [
  { 
    href: 'https://www.instagram.com/stanford.kida/', 
    icon: Instagram, 
    label: 'Instagram' 
  },
  { 
    href: 'mailto:stanford.kida@gmail.com', 
    icon: Mail, 
    label: 'Email' 
  }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-stanford-black text-fog/80">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img 
                src="/images/kidalogo2_1.jpg" 
                alt="KIDA Logo" 
                className="h-12 w-12 object-contain rounded-full brightness-0 invert opacity-90"
              />
              <span className="font-display font-bold text-xl text-fog-light">
                KIDA
              </span>
            </Link>
            <p className="text-fog-dark max-w-md leading-relaxed">
              King International Development Association — Stanford's hub for students 
              driven to tackle global development challenges.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-full bg-stone-dark/30 hover:bg-cardinal/20 hover:text-cardinal-light transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-fog-light mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-fog-dark hover:text-cardinal-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Affiliations */}
          <div>
            <h4 className="font-display font-semibold text-fog-light mb-4">
              Affiliations
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://kingcenter.stanford.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-fog-dark hover:text-cardinal-light transition-colors"
                >
                  King Center for Global Development
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://fsi.stanford.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-fog-dark hover:text-cardinal-light transition-colors"
                >
                  Freeman Spogli Institute
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://stanford.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-fog-dark hover:text-cardinal-light transition-colors"
                >
                  Stanford University
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-dark/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-fog-dark">
            © {currentYear} King International Development Association. All rights reserved.
          </p>
          <p className="text-sm text-fog-dark">
            A student organization at Stanford University.
          </p>
        </div>
      </div>
    </footer>
  )
}
