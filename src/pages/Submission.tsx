import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, Users, Send } from "lucide-react";

const Submission = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    manuscriptTitle: "",
    category: "",
    abstract: "",
    keywords: "",
    authors: [{ fullName: "", email: "", affiliation: "" }],
    files: [] as any[],
    ethics: false,
    conflicts: false,
    copyright: false,
  });

    useEffect(() => {
    const token = localStorage.getItem("access_token") 
    if (!token) {
      alert("You must login first!");
      navigate("/login"); // redirect to login page
    }
  }, []);

  const steps = [
    { number: 1, title: "Manuscript Details", icon: FileText },
    { number: 2, title: "Authors", icon: Users },
    { number: 3, title: "Upload Files", icon: Upload },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
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
    { title: "Manuscript File", description: "Main manuscript in .docx or .pdf format", required: true },
    { title: "Cover Letter", description: "Brief description of significance and novelty", required: true },
    { title: "Ethics Documentation", description: "Ethics approval for human/animal studies", required: false },
  ];

  // Author handlers
  const addAuthor = () =>
    setFormData({
      ...formData,
      authors: [...formData.authors, { fullName: "", email: "", affiliation: "" }]
    });

  const updateAuthor = (index: number, field: string, value: string) => {
    const updatedAuthors = formData.authors.map((author, i) =>
      i === index ? { ...author, [field]: value } : author
    );
    setFormData({ ...formData, authors: updatedAuthors });
  };

  // File upload handler
const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  requirement: string
) => {
  if (!event.target.files || event.target.files.length === 0) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("You must login first!");
    navigate("/login");
    return;
  }

  const filesArray = Array.from(event.target.files);
  const data = new FormData();

  filesArray.forEach((file) => {
    data.append("files", file); // note plural "files" for multiple files
  });

  try {
    const res = await fetch(`${API_URL}/submission/upload-multiple`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get("content-type");
    let result: any = {};
    if (contentType && contentType.includes("application/json")) {
      result = await res.json();
    } else {
      const text = await res.text();
      console.error("Server returned non-JSON response:", text);
      alert("File upload failed: server returned unexpected response");
      return;
    }

    if (res.ok) {
      // Add all uploaded files to formData.files
      const uploadedFiles = result.files.map((file: any) => ({
        ...file,
        requirement,
      }));

      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...uploadedFiles],
      }));
    } else {
      alert(result.message || "File upload failed");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Error uploading file");
  }
};




  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Submission
const handleSubmit = async () => {
const payload = {
  manuscriptTitle: formData.manuscriptTitle,
  category: formData.category,
  abstract: formData.abstract,
  keywords: formData.keywords,
  authors: formData.authors.map((a, i) => ({
    fullName: a.fullName,
    email: a.email,
    affiliation: a.affiliation,
    isCorresponding: i === 0,
    order: i + 1,
  })),
  files: formData.files.map((f) => ({
    fileName: f.fileName || f.original_filename || f.name,
    fileUrl: f.fileUrl || f.secure_url,
    mimeType: f.mimeType || f.type || "application/pdf",
    fileSize: f.fileSize || f.bytes || 1000,
    fileType:
      f.requirement === "Manuscript File"
        ? "MANUSCRIPT"
        : f.requirement === "Cover Letter"
        ? "COVER_LETTER"
        : "ETHICS_DOCUMENTATION",
  })),
  declarations: [
    {
      type: "ETHICAL_CONDUCT",
      isChecked: formData.ethics,
      text: "Ethics approval confirmation",
    },
    {
      type: "CONFLICT_OF_INTEREST",
      isChecked: formData.conflicts,
      text: "Conflict of interest disclosure",
    },
    {
      type: "COPYRIGHT_TRANSFER",
      isChecked: formData.copyright,
      text: "Copyright transfer confirmation",
    },
  ],
};


    try {
      const res = await fetch(`${API_URL}/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Submission successful!");
        setFormData({
          manuscriptTitle: "",
          category: "",
          abstract: "",
          keywords: "",
          authors: [{ fullName: "", email: "", affiliation: "" }],
          files: [],
          ethics: false,
          conflicts: false,
          copyright: false,
        });
        setCurrentStep(1);
      } else {
        alert(result.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting manuscript");
    }
  };

  const getFileStatus = (reqTitle: string) => {
    return formData.files.find(f => f.requirement === reqTitle) ? "Uploaded" : "Pending";
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Submit Your Research</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Submit your manuscript for peer review through our streamlined submission process.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${currentStep >= step.number ? "bg-primary border-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                {currentStep > step.number ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
              </div>
              <div className="ml-3 text-sm font-medium">{step.title}</div>
              {index < steps.length - 1 && <div className={`h-0.5 w-16 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <Card className="shadow-strong">
          <CardContent className="p-8">

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Manuscript Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Article Title *</Label>
                    <Input value={formData.manuscriptTitle} onChange={(e) => setFormData({ ...formData, manuscriptTitle: e.target.value })} />
                  </div>
                  <div>
                    <Label>Research Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger>
                      <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Keywords *</Label>
                    <Input value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} placeholder="Enter keywords separated by commas" />
                  </div>
                  <div>
                    <Label>Abstract *</Label>
                    <Textarea value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} className="min-h-32" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Author Information</h2>
                {formData.authors.map((author, i) => (
                  <Card key={i} className="shadow-soft">
                    <CardHeader><CardTitle className="text-lg">Author {i+1} {i===0 && <Badge className="ml-2">Corresponding</Badge>}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Full Name" value={author.fullName} onChange={(e) => updateAuthor(i, "fullName", e.target.value)} />
                      <Input placeholder="Email" type="email" value={author.email} onChange={(e) => updateAuthor(i, "email", e.target.value)} />
                      <Input placeholder="Affiliation" value={author.affiliation} onChange={(e) => updateAuthor(i, "affiliation", e.target.value)} />
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={addAuthor} variant="outline" className="w-full">Add Another Author</Button>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Upload Files</h2>
                {requirements.map((req, i) => (
                  <Card key={i} className="shadow-soft">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {req.title} 
                          <Badge variant={getFileStatus(req.title) === "Uploaded" ? "secondary" : "destructive"}>
                            {getFileStatus(req.title)}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <label>
                          <Upload className="mr-2 h-4 w-4"/> Upload
                          <input type="file" hidden onChange={(e) => handleFileUpload(e, req.title)} />
                        </label>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 4 */}
           {/* Step 4 */}
  {currentStep === 4 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>

    {/* Manuscript Details */}
    <Card className="shadow-soft">
      <CardHeader><CardTitle>Manuscript Details</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <p><b>Title:</b> {formData.manuscriptTitle}</p>
        <p><b>Category:</b> {formData.category}</p>
        <p><b>Keywords:</b> {formData.keywords}</p>
        <p><b>Abstract:</b></p>
        <p className="text-sm text-muted-foreground">{formData.abstract}</p>
      </CardContent>
    </Card>

    {/* Authors Table */}
    <Card className="shadow-soft">
      <CardHeader><CardTitle>Authors</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted-foreground/10">
                <th className="border border-border px-4 py-2 text-left">#</th>
                <th className="border border-border px-4 py-2 text-left">Full Name</th>
                <th className="border border-border px-4 py-2 text-left">Email</th>
                <th className="border border-border px-4 py-2 text-left">Affiliation</th>
                <th className="border border-border px-4 py-2 text-left">Corresponding</th>
              </tr>
            </thead>
            <tbody>
              {formData.authors.map((a, i) => (
                <tr key={i} className="hover:bg-muted-foreground/5">
                  <td className="border border-border px-4 py-2">{i + 1}</td>
                  <td className="border border-border px-4 py-2">{a.fullName}</td>
                  <td className="border border-border px-4 py-2">{a.email}</td>
                  <td className="border border-border px-4 py-2">{a.affiliation}</td>
                  <td className="border border-border px-4 py-2">{i === 0 ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* Files Table */}
    <Card className="shadow-soft">
      <CardHeader><CardTitle>Uploaded Files</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted-foreground/10">
                <th className="border border-border px-4 py-2 text-left">Requirement</th>
                <th className="border border-border px-4 py-2 text-left">File Name</th>
                <th className="border border-border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req, i) => {
                const uploadedFile = formData.files.find(f => f.requirement === req.title);
                return (
                  <tr key={i} className="hover:bg-muted-foreground/5">
                    <td className="border border-border px-4 py-2">{req.title}</td>
                    <td className="border border-border px-4 py-2">{uploadedFile?.fileName || "-"}</td>
                    <td className="border border-border px-4 py-2">
                      <Badge variant={uploadedFile ? "secondary" : "destructive"}>
                        {uploadedFile ? "Uploaded" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
   {/* Declarations */}
<Card className="shadow-soft">
  <CardHeader>
    <CardTitle>Declarations</CardTitle>
    <p className="text-sm text-muted-foreground mt-1">
      Please confirm each declaration before submitting your manuscript.
    </p>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted-foreground/5 transition">
      <div>
        <p className="font-medium">Ethics Approval</p>
        <p className="text-sm text-muted-foreground">
          I confirm that all research involving human or animal subjects has received ethics approval.
        </p>
      </div>
      <Checkbox 
        checked={formData.ethics} 
        onCheckedChange={(v) => setFormData({ ...formData, ethics: v as boolean })} 
      />
    </div>

    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted-foreground/5 transition">
      <div>
        <p className="font-medium">Conflict of Interest</p>
        <p className="text-sm text-muted-foreground">
          I declare that there are no conflicts of interest related to this manuscript.
        </p>
      </div>
      <Checkbox 
        checked={formData.conflicts} 
        onCheckedChange={(v) => setFormData({ ...formData, conflicts: v as boolean })} 
      />
    </div>

    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted-foreground/5 transition">
      <div>
        <p className="font-medium">Copyright Transfer</p>
        <p className="text-sm text-muted-foreground">
          I confirm that I have the right to transfer copyright to the publisher upon acceptance.
        </p>
      </div>
      <Checkbox 
        checked={formData.copyright} 
        onCheckedChange={(v) => setFormData({ ...formData, copyright: v as boolean })} 
      />
    </div>
  </CardContent>
</Card>

  </div>
)}
            {/* Navigation */}
            <div className="flex justify-between pt-8">
              <Button variant="outline" onClick={prevStep} disabled={currentStep===1}>Previous</Button>
              {currentStep<4 
                ? <Button onClick={nextStep}>Next</Button> 
                : <Button onClick={handleSubmit} disabled={!formData.ethics || !formData.conflicts || !formData.copyright}><Send className="mr-2 h-4 w-4"/>Submit</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submission;
