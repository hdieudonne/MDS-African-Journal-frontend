import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, BookOpen, Download, Eye, ArrowRight } from "lucide-react";

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const archiveData = [
    {
      year: 2024,
      volumes: [
        {
          issues: [
            {
              issue: 3,
              month: "March",
              articles: 8,
              featured: "Quantum Machine Learning Survey",
              downloads: 2847
            },
            {
              issue: 2,
              month: "February",
              articles: 6,
              featured: "Climate Change and Biodiversity",
              downloads: 3156
            },
            {
              issue: 1,
              month: "January",
              articles: 7,
              featured: "AI in Medical Diagnosis",
              downloads: 2734
            }
          ]
        }
      ]
    },
    {
      year: 2023,
      volumes: [
        {
          issues: [
            {
              issue: 12,
              month: "December",
              articles: 9,
              featured: "Sustainable Energy Storage",
              downloads: 4231
            },
            {
              issue: 11,
              month: "November",
              articles: 7,
              featured: "Neuromorphic Computing",
              downloads: 3876
            },
            {
              issue: 10,
              month: "October",
              articles: 8,
              featured: "Ocean Acidification Research",
              downloads: 3542
            }
          ]
        }
      ]
    },
    {
      year: 2022,
      volumes: [
        {
          issues: [
            {
              issue: 12,
              month: "December",
              articles: 10,
              featured: "Gene Editing Technologies",
              downloads: 5123
            },
            {
              issue: 11,
              month: "November",
              articles: 8,
              featured: "Space Weather Prediction",
              downloads: 4567
            }
          ]
        }
      ]
    }
  ];

  const specialIssues = [
    {
      title: "Artificial Intelligence in Healthcare",
      year: 2024,
      issue: "Special Issue 1",
      articles: 12,
      editors: "Dr. Patel, Prof. Chen",
      downloads: 5678
    },
    {
      title: "Climate Change Mitigation Technologies",
      year: 2023,
      issue: "Special Issue 2",
      articles: 15,
      editors: "Prof. Rodriguez, Dr. Wilson",
      downloads: 6234
    },
    {
      title: "Quantum Technologies and Applications",
      year: 2023,
      issue: "Special Issue 1",
      articles: 10,
      editors: "Dr. Chen, Prof. Tanaka",
      downloads: 4890
    }
  ];

  const years = ["2024", "2023", "2022"];
  const topics = ["Development Economics and Sustainable Growth", "Applied Microeconomics and Macroeconomics", "Financial Inclusion and Sector Stability", "Public Finance and Fiscal Policy", "Agricultural and Rural Development","Education, Economics, and Labor Markets","Entrepreneurship and Innovation in Africa","Economic Policy Analysis and Evaluation","Environmental and Energy Economics","Quantitative Modeling in Economics","Other"];

  const filteredArchive = archiveData.filter(yearData => {
    return selectedYear === "all" || yearData.year.toString() === selectedYear;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Journal Archive</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            View our complete collection of published research spanning over a decade of scientific advancement. 
            Access all past issues and discover breakthrough research from our archive.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All topics</SelectItem>
                  {topics.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Archive Statistics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-medium">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">450+</div>
                <div className="text-muted-foreground">Total Articles</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-medium">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">14</div>
                <div className="text-muted-foreground">Subscribers</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-medium">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">156</div>
                <div className="text-muted-foreground">Issues Published</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-medium">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">89K+</div>
                <div className="text-muted-foreground">Total Downloads</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Special Issues */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-heading mb-6">Special Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialIssues.map((special, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader>
                  <Badge variant="default" className="w-fit mb-2">Special Issue</Badge>
                  <CardTitle className="font-heading text-lg">{special.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div>{special.issue} • {special.year}</div>
                    <div>Guest Editors: {special.editors}</div>
                    <div className="flex items-center justify-between">
                      <span>{special.articles} articles</span>
                      <div className="flex items-center">
                        <Download className="mr-1 h-3 w-3" />
                        {special.downloads}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="flex-1">
                      <Eye className="mr-2 h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Archive by Year */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-6">View by Year</h2>
          <div className="space-y-8">
            {filteredArchive.map((yearData, yearIndex) => (
              <Card key={yearIndex} className="shadow-medium">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center">
                    <Calendar className="mr-3 h-6 w-6 text-primary" />
                    {yearData.year}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {yearData.volumes.map((volume, volumeIndex) => (
                    <div key={volumeIndex} className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {volume.issues.map((issue, issueIndex) => (
                          <Card key={issueIndex} className="shadow-soft hover:shadow-medium transition-smooth">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">Issue {issue.issue}</Badge>
                                <span className="text-sm text-muted-foreground">{issue.month}</span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 mb-4">
                                <div className="font-medium text-sm">{issue.featured}</div>
                                <div className="text-sm text-muted-foreground">
                                  {issue.articles} articles
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Download className="mr-1 h-3 w-3" />
                                  {issue.downloads} downloads
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="default" className="flex-1">
                                  <BookOpen className="mr-2 h-3 w-3" />
                                  View More
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center bg-gradient-card rounded-lg p-8">
          <h2 className="text-3xl font-bold font-heading mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our journal alerts to receive notifications about new issues and articles in your field of interest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Subscribe to Alerts
            </Button>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Archive;