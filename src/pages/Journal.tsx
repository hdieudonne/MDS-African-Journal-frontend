import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Filter, Calendar, User, Eye } from "lucide-react";

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Quantum Machine Learning: A Comprehensive Survey of Recent Advances",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Alex Thompson"],
      abstract: "This comprehensive survey examines the intersection of quantum computing and machine learning, exploring recent algorithmic advances and their potential applications in solving complex computational problems.",
      category: "Computer Science",
      date: "March 15, 2024",
      doi: "10.1234/rj.2024.001",
      views: 1247,
      downloads: 892,
      keywords: ["Quantum Computing", "Machine Learning", "Quantum Algorithms", "AI"]
    },
    {
      id: 2,
      title: "Climate Change Impact on Biodiversity: A Meta-Analysis of Global Ecosystems",
      authors: ["Dr. Emma Wilson", "Prof. James Liu", "Dr. Maria Santos"],
      abstract: "Through meta-analysis of 150+ studies, this research quantifies the impact of climate change on global biodiversity patterns and proposes conservation strategies for threatened ecosystems.",
      category: "Environmental Science",
      date: "February 28, 2024",
      doi: "10.1234/rj.2024.002",
      views: 2156,
      downloads: 1534,
      keywords: ["Climate Change", "Biodiversity", "Ecosystem Conservation", "Meta-Analysis"]
    },
    {
      id: 3,
      title: "Advanced Neural Networks for Early Disease Detection in Medical Imaging",
      authors: ["Prof. David Kumar", "Dr. Lisa Anderson", "Dr. Robert Taylor"],
      abstract: "Novel deep learning architectures demonstrate superior performance in early detection of various diseases from medical imaging data, with potential for clinical implementation.",
      category: "Medical Research",
      date: "January 20, 2024",
      doi: "10.1234/rj.2024.003",
      views: 1893,
      downloads: 1267,
      keywords: ["Medical Imaging", "Deep Learning", "Disease Detection", "Healthcare AI"]
    },
    {
      id: 4,
      title: "Sustainable Energy Storage: Advances in Next-Generation Battery Technologies",
      authors: ["Dr. Helen Zhang", "Prof. Carlos Rodriguez", "Dr. Yuki Tanaka"],
      abstract: "Investigation of novel battery materials and architectures for sustainable energy storage, focusing on lithium-sulfur and solid-state battery technologies for grid-scale applications.",
      category: "Energy Research",
      date: "December 15, 2023",
      doi: "10.1234/rj.2023.012",
      views: 1654,
      downloads: 1123,
      keywords: ["Energy Storage", "Battery Technology", "Sustainability", "Materials Science"]
    }
  ];

  const categories = [
    "Computer Science",
    "Environmental Science", 
    "Medical Research",
    "Energy Research",
    "Physics",
    "Chemistry",
    "Biology"
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-3xl font-bold font-heading mb-6">Current Topics</h1>
          
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="shadow-medium hover:shadow-strong transition-smooth">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {article.date}
                      </div>
                    </div>
                    <CardTitle className="font-heading text-xl md:text-2xl mb-2">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <User className="mr-1 h-4 w-4" />
                      <span className="text-sm">{article.authors.join(", ")}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      DOI: {article.doi}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Download className="mr-1 h-3 w-3" />
                        {article.downloads}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {article.abstract}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Read Article
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  {/* <Button variant="ghost" size="sm">
                    View Citations
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your search criteria.</p>
          </div>
        )}

        {/* Issue Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold mb-2">Browse Other Issues</h3>
              <p className="text-muted-foreground">Explore our archive of published research</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Previous Issue</Button>
              <Button variant="outline">All Issues</Button>
              <Button variant="outline">Next Issue</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;