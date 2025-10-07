import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Globe, ArrowRight, Download } from "lucide-react";
import Slider from "react-slick";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const featuredArticles = [
    {
      title: "Advances in Quantum Computing Research",
      authors: "Dr. Sarah Chen, Prof. Michael Rodriguez",
      date: "March 2024",
      category: "Computer Science",
    },
    {
      title: "Climate Change Impact on Marine Ecosystems",
      authors: "Dr. Emma Thompson, Dr. James Wilson",
      date: "February 2024",
      category: "Environmental Science",
    },
    {
      title: "Machine Learning in Medical Diagnosis",
      authors: "Prof. David Kumar, Dr. Lisa Anderson",
      date: "January 2024",
      category: "Medical Research",
    },
  ];

  const stats = [
    { icon: BookOpen, label: "Published Articles", value: "2,847" },
    { icon: Users, label: "Active Researchers", value: "1,250" },
    { icon: Globe, label: "Countries", value: "68" },
  ];

  // Hero carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const heroImages = [
    "image1.jpeg",
    "bg1.jpg",
    "bg2.jpg",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[80vh] w-full">
        <Slider {...sliderSettings} className="h-full">
          {heroImages.map((src, i) => (
            <div key={i} className="h-[80vh] w-full">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* Overlay text/buttons */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <p className="text-2xl md:text-2xl font-bold font-heading text-white mb-6 max-w-7xl">
            Bridging research and practical applications in economics, entrepreneurship, and development with a focus on African contexts.
          </p>
          <p className="text-xl md:text-4xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Welcome to the MDS AJournal of Applied Economics and Development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button size="lg" variant="secondary" className="font-semibold">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Current Issue
            </Button> */}
             <Link to='/submission'>
            <Button
              size="lg"
              variant="ghost"
              className=""
            >
              Submit Your Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center ">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Latest Research</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest breakthrough research and scholarly contributions from leading experts worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader>
                  <div className="text-sm text-primary font-bold mb-2">{article.category}</div>
                  <CardTitle className="font-heading">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.authors}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                    <Button  size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/journal">
              <Button  size="lg">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to Share Your Research?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of researchers and contribute to the advancement of scientific knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submission">
              <Button size="lg" className="font-semibold">
                Submit Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/author-page">
              <Button variant="outline" size="lg">
                Author Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
