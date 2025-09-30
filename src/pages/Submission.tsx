import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Users, Send } from "lucide-react";

const Submission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    abstract: "",
    authors: [{ name: "", email: "", affiliation: "" }],
    ethics: false,
    conflicts: false,
    copyright: false
  });

  const steps = [
    { number: 1, title: "Manuscript Details", icon: FileText },
    { number: 2, title: "Authors", icon: Users },
    { number: 3, title: "Upload Files", icon: Upload },
    { number: 4, title: "Review & Submit", icon: CheckCircle }
  ];

  const categories = [
    "Applied Microeconomics and Macroeconomics",
    "Financial Inclusion and Sector Stability",
    "Development Economics and Sustainable Growth", 
    "Public Finance and Fiscal Policy",
    "Agricultural and Rural Development",
    "Education, Economics, and Labor Markets",
    "Entrepreneurship and Innovation in Africa",
    "Economic Policy Analysis and Evaluation",
    "Environmental and Energy Economics",
    "Quantitative Modeling in Economics",
    "Other"
  ];

  const requirements = [
    {
      title: "Manuscript File",
      description: "Main manuscript in .docx or .pdf format",
      required: true,
      status: "pending"
    },
    {
      title: "Cover Letter",
      description: "Brief description of significance and novelty",
      required: true,
      status: "pending"
    },
    {
      title: "Ethics Documentation",
      description: "Ethics approval for human/animal studies",
      required: false,
      status: "optional"
    },
  ];

  const addAuthor = () => {
    setFormData({
      ...formData,
      authors: [...formData.authors, { name: "", email: "", affiliation: "" }]
    });
  };

  const updateAuthor = (index: number, field: string, value: string) => {
    const updatedAuthors = formData.authors.map((author, i) => 
      i === index ? { ...author, [field]: value } : author
    );
    setFormData({ ...formData, authors: updatedAuthors });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Submit Your Research</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Submit your manuscript for peer review through our streamlined submission process. 
            Follow the steps below to ensure your research reaches the global scientific community.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-smooth ${
                  currentStep >= step.number 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-border text-muted-foreground"
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-16 mx-4 transition-smooth ${
                    currentStep > step.number ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-strong">
          <CardContent className="p-8">
            {/* Step 1: Manuscript Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-heading mb-6">Manuscript Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Article Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter the full title of your research article"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Research Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select the primary research category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="abstract">Abstract *</Label>
                    <Textarea
                      id="abstract"
                      placeholder="Enter your abstract (250-300 words)"
                      value={formData.abstract}
                      onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                      className="mt-1 min-h-32"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {formData.abstract.length}/300 words
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Authors */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-heading mb-6">Author Information</h2>
                
                {formData.authors.map((author, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Author {index + 1} {index === 0 && <Badge variant="default" className="ml-2">Corresponding</Badge>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          placeholder="Enter author's full name"
                          value={author.name}
                          onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Email Address *</Label>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={author.email}
                          onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Institutional Affiliation *</Label>
                        <Input
                          placeholder="Enter institution and department"
                          value={author.affiliation}
                          onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button type="button" variant="outline" onClick={addAuthor} className="w-full">
                  Add Another Author
                </Button>
              </div>
            )}

            {/* Step 3: File Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-heading mb-6">Upload Files</h2>
                
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <Card key={index} className="shadow-soft">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{req.title}</h3>
                              {req.required ? (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">Optional</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{req.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {req.status === "pending" && <Clock className="h-5 w-5 text-muted-foreground" />}
                            {req.status === "uploaded" && <CheckCircle className="h-5 w-5 text-success" />}
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-accent/10 border-accent">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">File Requirements</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Maximum file size: 50MB per file</li>
                          <li>• Accepted formats: .docx, .pdf, .png, .jpg, .tiff</li>
                          <li>• Figures must be minimum 300 DPI resolution</li>
                          <li>• All files will be scanned for viruses</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-heading mb-6">Review & Submit</h2>
                
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Submission Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="font-medium">Title:</Label>
                      <p className="text-muted-foreground">{formData.title || "Not provided"}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Category:</Label>
                      <p className="text-muted-foreground">{formData.category || "Not selected"}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Authors:</Label>
                      <p className="text-muted-foreground">
                        {formData.authors.map(author => author.name).filter(name => name).join(", ") || "No authors added"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Required Declarations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="ethics" 
                        checked={formData.ethics}
                        onCheckedChange={(checked) => setFormData({...formData, ethics: checked as boolean})}
                      />
                      <Label htmlFor="ethics" className="text-sm leading-relaxed">
                        I confirm that this research has been conducted in accordance with ethical standards 
                        and all necessary approvals have been obtained.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="conflicts" 
                        checked={formData.conflicts}
                        onCheckedChange={(checked) => setFormData({...formData, conflicts: checked as boolean})}
                      />
                      <Label htmlFor="conflicts" className="text-sm leading-relaxed">
                        I have disclosed all potential conflicts of interest related to this research.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="copyright" 
                        checked={formData.copyright}
                        onCheckedChange={(checked) => setFormData({...formData, copyright: checked as boolean})}
                      />
                      <Label htmlFor="copyright" className="text-sm leading-relaxed">
                        I confirm that I have the right to submit this work and transfer copyright 
                        to the journal upon acceptance.
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-border">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button 
                  className="font-semibold"
                  disabled={!formData.ethics || !formData.conflicts || !formData.copyright}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Manuscript
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="mt-8 bg-gradient-card shadow-medium">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our editorial team is here to assist you with the submission process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                Submission Guidelines
              </Button>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submission;