import { Mail, Phone, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Developer Info */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-900">
              Developed by <span className="text-primary font-semibold">Sumant Yadav</span>
            </p>
            <p className="text-xs text-gray-600">Full Stack Developer | MERN Stack Specialist</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <a 
              href="mailto:sumantyadav3086@gmail.com" 
              className="flex items-center gap-1 hover:text-primary transition-colors"
              title="Email Sumant Yadav"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">sumantyadav3086@gmail.com</span>
            </a>
            <a 
              href="tel:+919599617479" 
              className="flex items-center gap-1 hover:text-primary transition-colors"
              title="Call Sumant Yadav"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9599617479</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
