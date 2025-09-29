import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Users, 
  FileText,
  Globe
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Editorial Office",
      details: [
        "editor@researchjournal.com",
        "submissions@researchjournal.com"
      ]
    },
    {
      icon: Phone,
      title: "Phone & Fax",
      details: [
        "Tel: +1 (555) 123-4567",
        "Fax: +1 (555) 123-4568"
      ]
    },
    {
      icon: MapPin,
      title: "Mailing Address",
      details: [
        "Research Journal Editorial Office",
        "123 Academic Plaza, Suite 400",
        "Research City, RC 12345"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const inquiryTypes = [
    "General Information",
    "Submission Guidelines",
    "Peer Review Process",
    "Technical Support",
    "Editorial Board",
    "Subscription & Access",
    "Copyright & Permissions",
    "Other"
  ];

  const departments = [
    {
      name: "Editorial Department",
      email: "editorial@researchjournal.com",
      description: "Manuscript submissions, review process, and editorial decisions"
    },
    {
      name: "Technical Support",
      email: "support@researchjournal.com", 
      description: "Website issues, submission system problems, and technical assistance"
    },
    {
      name: "Subscriptions",
      email: "subscriptions@researchjournal.com",
      description: "Journal subscriptions, access issues, and institutional licensing"
    },
    {
      name: "Marketing & Partnerships",
      email: "partnerships@researchjournal.com",
      description: "Advertising, partnerships, and promotional opportunities"
    }
  ];

  const faqs = [
    {
      question: "How long does the review process take?",
      answer: "The typical review process takes 8-12 weeks from submission to initial decision."
    },
    {
      question: "What are the publication fees?",
      answer: "We operate on an open access model with article processing charges disclosed during submission."
    },
    {
      question: "Can I submit a manuscript in languages other than English?",
      answer: "Currently, we only accept manuscripts written in English with proper academic formatting."
    },
    {
      question: "How do I track my submission status?",
      answer: "You can track your submission through our online portal using your manuscript ID."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our editorial team for any questions about submissions, 
            peer review, or journal policies. We're here to support your research journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="affiliation">Institution/Affiliation</Label>
                  <Input id="affiliation" placeholder="Enter your institution or organization" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="inquiryType">Inquiry Type *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select the type of inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Brief description of your inquiry" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide detailed information about your inquiry..."
                    className="mt-1 min-h-32"
                  />
                </div>

                <Button size="lg" className="w-full font-semibold">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Department Contacts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Department Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <Users className="mr-3 h-5 w-5 text-primary" />
                    {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{dept.description}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href={`mailto:${dept.email}`} className="text-primary hover:text-primary-light transition-fast">
                      {dept.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-start">
                    <FileText className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </div>
        </section>

        {/* Location & Social */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <MapPin className="mr-3 h-6 w-6 text-primary" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Academic Plaza, Research City</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Located in the heart of the academic district, our offices are easily accessible 
                  by public transportation and offer visitor parking.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Globe className="mr-3 h-6 w-6 text-primary" />
                  Connect With Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Stay updated with the latest research and journal news through our social media channels.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">LinkedIn</Button>
                    <Button variant="outline" size="sm">ResearchGate</Button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Newsletter</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Subscribe to receive updates on new issues and calls for papers.
                    </p>
                    <div className="flex gap-2">
                      <Input placeholder="Enter email" className="flex-1" />
                      <Button size="sm">Subscribe</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Response Time Notice */}
        <Card className="mt-8 bg-accent/10 border-accent shadow-medium">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Response Time</h3>
            <p className="text-muted-foreground">
              We typically respond to inquiries within 24-48 hours during business days. 
              For urgent matters, please call our editorial office directly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;