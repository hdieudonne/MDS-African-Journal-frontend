import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const EditorialBoard = () => {
  const editorInChief = {
    title: "Donald Masimbi (MSc Econ)",
    bio: "Donald Masimbi is an economist, researcher, and lecturer at Kibogora Polytechnic, Rwanda. He is also the Managing Director of MDS Consultancy. As Managing Editor of MDS-JAED, he oversees the journal’s operations, peer review process, and author engagement. His goal is to promote applied, data-driven research that supports inclusive development in Africa.",
    email: "editor.chief@researchjournal.com",
    website: "https://stanford.edu/~mthompson",
    image: "managing.webp"
  };

  const associateEditors = [
    {
      name: "Chief Editor",
      title: "Dr. Justin RUTIKANGA (PhD)",
      expertise: ["Statistics"],
      bio: "Dr. Justin RUTIKANGA is a respected scholar with expertise in Statistics. He holds a PhD and has published widely on African economic transformation and financial inclusion. Currently serving as a senior academic, he leads the editorial vision of MDS-JAED, focusing on high-impact, policy-relevant research rooted in the African context.",
      email: "j.chen@researchjournal.com",
      image: "editor.webp"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Editorial Board</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our Editorial Board brings together scholars and practitioners who share a commitment to rigorous, policy-oriented research that advances inclusive and sustainable development across Africa and beyond.
          </p>
        </div>

        {/* Editor-in-Chief */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Managing Editor</h2>
          <Card className="max-w-4xl shadow-strong">
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-64 h-64  overflow-hidden">
                  <img src={editorInChief.image} alt="Managing Editor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{editorInChief.title}</h3>
                  <p className="text-muted-foreground mb-4">{editorInChief.bio}</p>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" /> Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Associate Editors */}
      
      <section className="mb-16">
  <h2 className="text-3xl font-bold text-center mb-8">Editors</h2>
  <div className="flex flex-wrap justify-start gap-8">
    {associateEditors.map((editor, index) => (
      <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth max-w-4xl w-full md:w-[900px]">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-64 h-64 overflow-hidden flex-shrink-0 rounded-lg">
              <img src={editor.image} alt={editor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{editor.name}</h3>
              <Badge variant="secondary" className="text-xs mb-2">{editor.title}</Badge>
              <div className="flex flex-wrap gap-2 mb-2">
                {editor.expertise.map((area, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{area}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{editor.bio}</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Mail className="mr-2 h-3 w-3" /> Contact Editor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</section>


      </div>
    </div>
  );
};

export default EditorialBoard;
