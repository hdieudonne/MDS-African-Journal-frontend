import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  FileText,
  Globe,
} from "lucide-react";
import { toast } from "react-toastify";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

const Contact: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const contactInfo = [
    {
      icon: Mail,
      title: "Editorial Office",
      details: ["editor@researchjournal.com", "submissions@researchjournal.com"],
    },
    {
      icon: MapPin,
      title: "Mailing Address",
      details: [
        "Research Journal Editorial Office",
        "123 Academic Plaza, Suite 400",
        "Research City, RC 12345",
      ],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon-Fri: 9am - 5pm", "Sat: 10am - 2pm", "Sun: Closed"],
    },
  ];

  const inquiryTypes = [
    "General Information",
    "Submission Guidelines",
    "Peer Review Process",
    "Technical Support",
    "Editorial Board",
    "Subscription & Access",
    "Copyright & Permissions",
    "Other",
  ];

  // Fetch FAQs
  const fetchFaqs = async () => {
    setLoadingFaqs(true);
    try {
      const res = await fetch(`${baseUrl}/faqs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      if (data.status === "success" && data.data?.faqs) {
        setFaqs(data.data.faqs);
      } else {
        setFaqs([]);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setFaqs([]);
    } finally {
      setLoadingFaqs(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !inquiryType || !subject || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          institution,
          inquiryType: inquiryType.toLowerCase().replace(/\s+/g, "-"),
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        toast.success("Message sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setInstitution("");
        setInquiryType("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Newsletter subscribe function
  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail) {
      toast.error("Please enter your email");
      return;
    }

    setNewsletterLoading(true);
    try {
      const res = await fetch(`${baseUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        toast.success("Subscribed to newsletter successfully!");
        setNewsletterEmail("");
      } else {
        toast.error(data.message || "Failed to subscribe");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  const displayedFaqs = showAllFaqs ? faqs : faqs.slice(0, 5);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our editorial team for any questions about
            submissions, peer review, or journal policies.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="institution">Institution/Affiliation</Label>
                    <Input
                      id="institution"
                      placeholder="Enter your institution"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select
                      onValueChange={(val) => setInquiryType(val)}
                      value={inquiryType}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Provide detailed information..."
                      className="mt-1 min-h-32"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full font-semibold mt-2"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <Card key={idx} className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((d, i) => (
                        <p key={i} className="text-muted-foreground text-sm mb-1">
                          {d}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          {loadingFaqs ? (
            <p className="text-center">Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p className="text-center text-muted-foreground">No FAQs available.</p>
          ) : (
            <>
              <div className="max-w-4xl mx-auto space-y-4">
                {displayedFaqs.map((faq) => (
                  <Card key={faq.id} className="shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 flex items-start">
                        <FileText className="mr-2 h-5 w-5 text-primary mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground ml-7">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {faqs.length > 5 && (
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                  >
                    {showAllFaqs ? "Show Less" : "View More"}
                  </Button>
                </div>
              )}
            </>
          )}
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
                  Located in the heart of the academic district, our offices are
                  easily accessible by public transportation and offer visitor
                  parking.
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
                    Stay updated with the latest research and journal news
                    through our social media channels.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      ResearchGate
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Newsletter</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Subscribe to receive updates on new issues and calls for
                      papers.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter email"
                        className="flex-1"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <Button
                        size="sm"
                        disabled={newsletterLoading}
                        onClick={handleNewsletterSubscribe}
                      >
                        {newsletterLoading ? "..." : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
