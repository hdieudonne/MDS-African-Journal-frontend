import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Users, Globe, BookOpen } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in peer review and scholarly publishing."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Fostering interdisciplinary research and global academic partnerships."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making research freely available to advance knowledge worldwide."
    },
    {
      icon: Award,
      title: "Integrity",
      description: "Upholding ethical standards and research transparency in all publications."
    }
  ];

  const milestones = [
    { year: "2010", event: "Journal founded with inaugural issue" },
    { year: "2015", event: "Achieved international recognition and indexing" },
    { year: "2018", event: "Launched open access initiative" },
    { year: "2020", event: "Reached 1000+ published articles milestone" },
    { year: "2022", event: "Expanded to include emerging research fields" },
    { year: "2024", event: "Celebrating 14 years of scientific excellence" }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Our Journal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated to advancing scientific knowledge through rigorous peer-reviewed research 
            and fostering collaboration among the global research community.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Target className="mr-3 h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To publish high-quality, peer-reviewed research that advances scientific understanding 
                and contributes to solving global challenges. We are committed to maintaining the highest 
                standards of academic integrity while making research accessible to scholars worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To be the premier international platform for interdisciplinary research, fostering 
                innovation and collaboration across scientific boundaries. We envision a future where 
                knowledge flows freely and research drives positive change in society.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <value.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="font-heading">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Journal History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center mb-8">
                  <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-primary mr-4">{milestone.year}</span>
                    </div>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Philosophy */}
        <section className="bg-gradient-card rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold font-heading mb-4">Editorial Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Rigorous Peer Review</h3>
              <p className="text-muted-foreground mb-4">
                Every submission undergoes thorough double-blind peer review by experts in the field. 
                We maintain strict quality standards while providing constructive feedback to authors.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Open Science</h3>
              <p className="text-muted-foreground mb-4">
                We champion open access publishing and transparent research practices, including data 
                sharing and reproducible methodologies to advance scientific progress.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Interdisciplinary Approach</h3>
              <p className="text-muted-foreground mb-4">
                We encourage research that crosses traditional disciplinary boundaries, fostering 
                innovative solutions to complex global challenges.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Global Perspective</h3>
              <p className="text-muted-foreground mb-4">
                Our editorial board and reviewer network span multiple continents, ensuring diverse 
                perspectives and international relevance in published research.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of our mission to advance scientific knowledge and contribute to positive change in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Submit Your Research
            </Button>
            <Button variant="outline" size="lg">
              Become a Reviewer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;