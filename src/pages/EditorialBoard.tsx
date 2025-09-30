import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Globe, GraduationCap, Award } from "lucide-react";

const EditorialBoard = () => {
  const editorInChief = {
    title: "Donald Masimbi (MSc Econ)",
    bio: "Donald Masimbi is an economist, researcher, and lecturer at Kibogora Polytechnic, Rwanda. He is also the Managing Director of MDS Consultancy. As Managing Editor of MDS-JAED, he oversees the journal’s operations, peer review process, and author engagement. His goal is to promote applied, data-driven research that supports inclusive development in Africa.",
    email: "editor.chief@researchjournal.com",
    website: "https://stanford.edu/~mthompson"
  };

  const associateEditors = [
    {
      name: "Chief Editor",
      title: "Dr. Justin RUTIKANGA (PhD)",
      expertise: ["Statistics"],
      bio: "Dr. Justin RUTIKANGA is a respected scholar with expertise in Statistics. He holds a PhD and has published widely on African economic transformation and financial inclusion. Currently serving as a senior academic, he leads the editorial vision of MDS-JAED, focusing on high-impact, policy-relevant research rooted in the African context.",
      email: "j.chen@researchjournal.com"
    },
   
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
           Our Editorial Board brings together scholars and practitioners who share a commitment to rigorous, policy-oriented research that advances inclusive and sustainable development across Africa and beyond.
          </p>
        </div>

        {/* Editor-in-Chief */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Managing Editor</h2>
          <Card className="max-w-4xl  shadow-strong">
            <CardHeader className="text-center">
              <div className="w-32 h-32 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
                <img src="managing.webp" alt="" className="rounded-full" />
              </div>
             
              <Badge variant="default" className="w-fit mx-auto">{editorInChief.title}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div>
                  
                  <p className="text-muted-foreground mb-4">{editorInChief.bio}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Associate Editors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Editors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {associateEditors.map((editor, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <img src="editor.webp" alt="" className="rounded-full" />
                  </div>
                  <CardTitle className="text-lg font-heading">{editor.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto text-xs">
                    {editor.title}
                  </Badge>
                </CardHeader>
                <CardContent>
              
                  
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
        {/* <section>
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
        </section> */}

        {/* Call to Action */}
        {/* <section className="mt-16 text-center bg-gradient-card rounded-lg p-8">
          <h2 className="text-3xl font-bold font-heading mb-4">Join Our Review Network</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become part of our distinguished community of peer reviewers and contribute 
            to maintaining the highest standards of scientific publishing.
          </p>
          <Button size="lg" className="font-semibold">
            Apply to be a Reviewer
          </Button>
        </section> */}
      </div>
    </div>
  );
};

export default EditorialBoard;