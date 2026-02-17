import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Demo Calls', path: '/demos' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Integrations', path: '/demos' },
  ],
  Industries: [
    { name: 'Plumbing', path: '/' },
    { name: 'Electrical', path: '/' },
    { name: 'HVAC', path: '/' },
    { name: 'Healthcare', path: '/' },
  ],
  Company: [
    { name: 'About Us', path: '/contact' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/' },
    { name: 'Careers', path: '/' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/' },
    { name: 'Terms of Service', path: '/' },
    { name: 'Cookie Policy', path: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-black text-lg">
                A
              </div>
              <span className="text-xl font-bold text-white">
                Andy <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The AI receptionist that answers calls, captures details, and
              books appointments — 24/7.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Andy AI. All rights reserved.
          </p>
          <p className="text-sm">
            Your <span className="text-primary">AI receptionist</span> that
            never takes a day off.
          </p>
        </div>
      </div>
    </footer>
  )
}
