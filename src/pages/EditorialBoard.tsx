import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Globe, GraduationCap, Award } from "lucide-react";

const EditorialBoard = () => {
  const editorInChief = {
    name: "Prof. Dr. Margaret Thompson",
    title: "Editor-in-Chief",
    affiliation: "Stanford University, Department of Advanced Sciences",
    expertise: ["Interdisciplinary Research", "Science Policy", "Academic Leadership"],
    bio: "Professor Thompson brings over 25 years of experience in leading scientific research and academic publishing. She has published 150+ peer-reviewed articles and serves on multiple editorial boards.",
    email: "editor.chief@researchjournal.com",
    website: "https://stanford.edu/~mthompson"
  };

  const associateEditors = [
    {
      name: "Dr. James Chen",
      title: "Associate Editor - Computer Science",
      affiliation: "MIT, Computer Science and Artificial Intelligence Laboratory",
      expertise: ["Machine Learning", "Quantum Computing", "AI Ethics"],
      bio: "Leading researcher in quantum-classical machine learning interfaces with 80+ publications in top-tier venues.",
      email: "j.chen@researchjournal.com"
    },
    {
      name: "Prof. Elena Rodriguez",
      title: "Associate Editor - Environmental Sciences",
      affiliation: "University of Cambridge, Department of Earth Sciences",
      expertise: ["Climate Modeling", "Ecosystem Dynamics", "Sustainability"],
      bio: "Internationally recognized expert in climate change research and environmental policy development.",
      email: "e.rodriguez@researchjournal.com"
    },
    {
      name: "Dr. Rajesh Patel",
      title: "Associate Editor - Medical Research",
      affiliation: "Harvard Medical School, Department of Biomedical Informatics",
      expertise: ["Medical AI", "Precision Medicine", "Digital Health"],
      bio: "Pioneer in medical AI applications with focus on translating research into clinical practice.",
      email: "r.patel@researchjournal.com"
    }
  ];

  const editorialBoard = [
    {
      name: "Prof. Yuki Tanaka",
      affiliation: "University of Tokyo",
      expertise: ["Materials Science", "Nanotechnology"],
      country: "Japan"
    },
    {
      name: "Dr. Sophie Laurent",
      affiliation: "Sorbonne University",
      expertise: ["Theoretical Physics", "Quantum Mechanics"],
      country: "France"
    },
    {
      name: "Prof. Ahmed Hassan",
      affiliation: "American University in Cairo",
      expertise: ["Renewable Energy", "Engineering"],
      country: "Egypt"
    },
    {
      name: "Dr. Maria Santos",
      affiliation: "University of São Paulo",
      expertise: ["Bioinformatics", "Computational Biology"],
      country: "Brazil"
    },
    {
      name: "Prof. David Wilson",
      affiliation: "Oxford University",
      expertise: ["Chemistry", "Drug Discovery"],
      country: "United Kingdom"
    },
    {
      name: "Dr. Priya Sharma",
      affiliation: "Indian Institute of Science",
      expertise: ["Data Science", "Statistics"],
      country: "India"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Editorial Board</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our distinguished editorial board comprises leading experts from prestigious institutions worldwide, 
            ensuring the highest standards of peer review and scientific excellence.
          </p>
        </div>

        {/* Editor-in-Chief */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Editor-in-Chief</h2>
          <Card className="max-w-4xl mx-auto shadow-strong">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading">{editorInChief.name}</CardTitle>
              <Badge variant="default" className="w-fit mx-auto">{editorInChief.title}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Affiliation</h4>
                  <p className="text-muted-foreground mb-4">{editorInChief.affiliation}</p>
                  
                  <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {editorInChief.expertise.map((area, index) => (
                      <Badge key={index} variant="outline">{area}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Biography</h4>
                  <p className="text-muted-foreground mb-4">{editorInChief.bio}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Associate Editors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Associate Editors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {associateEditors.map((editor, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-heading">{editor.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto text-xs">
                    {editor.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{editor.affiliation}</p>
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {editor.expertise.map((area, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{area}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{editor.bio}</p>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="mr-2 h-3 w-3" />
                    Contact Editor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Editorial Board Members */}
        <section>
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Editorial Board Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialBoard.map((member, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold font-heading mb-2">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.affiliation}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {member.expertise.map((area, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{area}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-center text-xs text-muted-foreground">
                      <Globe className="mr-1 h-3 w-3" />
                      {member.country}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center bg-gradient-card rounded-lg p-8">
          <h2 className="text-3xl font-bold font-heading mb-4">Join Our Review Network</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become part of our distinguished community of peer reviewers and contribute 
            to maintaining the highest standards of scientific publishing.
          </p>
          <Button size="lg" className="font-semibold">
            Apply to be a Reviewer
          </Button>
        </section>
      </div>
    </div>
  );
};

export default EditorialBoard;