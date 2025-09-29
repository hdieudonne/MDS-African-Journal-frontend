import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-heading font-bold text-xl">Research Journal</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Advancing scientific knowledge through peer-reviewed research and scholarly communication. 
              Our journal publishes high-quality research across multiple disciplines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">About Us</Link></li>
              <li><Link to="/journal" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">Current Issue</Link></li>
              <li><Link to="/submission" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">Submit Article</Link></li>
              <li><Link to="/archive" className="text-primary-foreground/80 hover:text-primary-foreground transition-fast">Archive</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>editor@researchjournal.com</span>
              </li>
              <li className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Academic Plaza, Research City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © 2024 Research Journal. All rights reserved. | ISSN: 2024-5678
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;