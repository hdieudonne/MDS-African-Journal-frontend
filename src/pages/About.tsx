import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Users, Globe, BookOpen } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Research Excellence",
      description:
        "The MDS Journal of Applied Economics and Development is dedicated to publishing high-quality, peer-reviewed research that addresses critical economic issues in Africa. Our commitment to excellence ensures that every article contributes valuable insights into theory and practice within the fields of economics and development.",
    },
    {
      icon: Users,
      title: "Policy Impact",
      description:
        "We strive to bridge the gap between academia and policy-making. Our journal provides a platform for policy analyses that inform decision-makers on effective strategies for sustainable development in the Great Lakes region and beyond.",
    },
    {
      icon: Globe,
      title: "Engagement with Practitioners",
      description:
        "Our journal actively engages with practitioners by publishing practical case studies that showcase successful initiatives in economic development. We believe that sharing real-world experiences is essential for fostering innovation and collaboration in the field.",
    },
  ];

  const milestones = [
    { year: "2010", event: "Journal founded with inaugural issue" },
    { year: "2015", event: "Achieved international recognition and indexing" },
    { year: "2018", event: "Launched open access initiative" },
    { year: "2020", event: "Reached 1000+ published articles milestone" },
    { year: "2022", event: "Expanded to include emerging research fields" },
    { year: "2024", event: "Celebrating 14 years of scientific excellence" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Empowering Knowledge Through Research
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            MDS Journal of Applied Economics & Development (MDS-JAED)
          </p>
          <p className="font-bold italic">
            Published by MDS Consultancy, Rwanda
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Target className="mr-3 h-6 w-6 text-primary" />
                What is MDS-JAED?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                MDS-JAED is a biannual, peer-reviewed academic journal committed
                to advancing knowledge in economics, finance, and development
                studies with a strong emphasis on African and emerging
                economies. Launched under the leadership of MDS Consultancy, the
                journal provides a platform for researchers, scholars,
                practitioners, and policymakers to share original and impactful
                research that bridges theory with practice. We are particularly
                interested in applied, evidence-based contributions that address
                real-world challenges such as poverty, inequality, financial
                inclusion, entrepreneurship, public finance, education, and
                sustainable development.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                Why publish with us?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Publishing with MDS-JAED ensures that your work reaches a wide
                audience of scholars, policymakers, and practitioners. We
                prioritize high-quality, peer-reviewed research that provides
                practical insights and contributes to the development discourse
                in Africa and beyond.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                How to contribute?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We invite researchers and practitioners to submit original
                articles, policy analyses, and case studies. Our submission
                process is straightforward, and we encourage interdisciplinary
                approaches that align with our mission to enhance economic and
                developmental knowledge.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                Aims and Scope
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                MDS-JAED aims to: Promote high-quality research that informs
                policy and practice in the Global South Encourage
                cross-disciplinary dialogue on development and economic
                transformation Support African scholars in publishing
                internationally visible research Provide a platform for
                innovative methods, models, and field-based case studies
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                Publication Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Biannual: Volume 1, Issue 1: July-December Volume 1, Issue 2:
                January–June Special issues may be released to cover thematic
                topics or regional focus areas.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center font-heading">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                Research Indexing and Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to build a globally recognized academic journal
                grounded in African perspectives.MDS-JAED is in the process of
                applying for: ISSN assignment Google Scholar indexing DOAJ
                registration CrossRef DOIs (via Zenodo or institutional
                partnership) Our goal is to build a globally recognized academic
                journal grounded in African perspectives.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">
            Our Mission
          </h2>
          <h2 className="text-xl text-center mb-2">
            Highlighting our contributions to economics and development in
            Africa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center shadow-soft hover:shadow-medium transition-smooth"
              >
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


        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of our mission to advance scientific knowledge and
            contribute to positive change in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Submit Your Research
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
