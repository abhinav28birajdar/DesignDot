"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Palette,
  Monitor,
  Smartphone,
  FileText,
  Image,
  Zap,
  Target,
  Wand2,
  ArrowRight,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const designModes = [
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Logo design, brand guidelines, and visual identity systems",
    icon: Palette,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "ui_ux",
    title: "UI/UX Design",
    description: "Web interfaces, mobile apps, and user experience designs",
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "social_media",
    title: "Social Media",
    description: "Posts, stories, covers, and social media graphics",
    icon: Smartphone,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "print",
    title: "Print Design",
    description: "Flyers, brochures, business cards, and print materials",
    icon: FileText,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "web_banner",
    title: "Web Banners",
    description: "Display ads, web banners, and digital marketing materials",
    icon: Image,
    gradient: "from-indigo-500 to-purple-600",
  },
];

const designStyles = [
  { id: "minimalist", name: "Minimalist", description: "Clean, simple, and focused" },
  { id: "modern", name: "Modern", description: "Contemporary and sleek" },
  { id: "vintage", name: "Vintage", description: "Classic and timeless" },
  { id: "playful", name: "Playful", description: "Fun and energetic" },
  { id: "elegant", name: "Elegant", description: "Sophisticated and refined" },
  { id: "bold", name: "Bold", description: "Strong and impactful" },
  { id: "corporate", name: "Corporate", description: "Professional and trustworthy" },
  { id: "creative", name: "Creative", description: "Artistic and innovative" },
];

const platforms = [
  { id: "instagram_post", name: "Instagram Post", dimensions: "1080 × 1080", platform: "Instagram" },
  { id: "instagram_story", name: "Instagram Story", dimensions: "1080 × 1920", platform: "Instagram" },
  { id: "facebook_post", name: "Facebook Post", dimensions: "1200 × 630", platform: "Facebook" },
  { id: "linkedin_post", name: "LinkedIn Post", dimensions: "1200 × 627", platform: "LinkedIn" },
  { id: "twitter_header", name: "Twitter Header", dimensions: "1500 × 500", platform: "Twitter" },
  { id: "a4_flyer", name: "A4 Flyer", dimensions: "210 × 297 mm", platform: "Print" },
  { id: "business_card", name: "Business Card", dimensions: "89 × 51 mm", platform: "Print" },
  { id: "web_banner", name: "Web Banner", dimensions: "728 × 90", platform: "Web" },
  { id: "custom", name: "Custom Size", dimensions: "Custom", platform: "Custom" },
];

export default function CreatePage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [selectedMode, setSelectedMode] = React.useState("");
  const [selectedStyle, setSelectedStyle] = React.useState("");
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [brief, setBrief] = React.useState("");
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [newKeyword, setNewKeyword] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleGenerate = async () => {
    if (!selectedMode || !selectedStyle || !selectedPlatform || !brief) {
      return;
    }

    setIsGenerating(true);
    
    try {
      // Here you would call your AI generation API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to the editor/workspace
      router.push(`/create/${selectedMode}/workspace`);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return null; // or loading component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aakar-green-50 to-aakar-gold-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-aakar-green-100 text-aakar-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Design Generation
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4">
              Create Your Next <span className="aakar-text-gradient">Masterpiece</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into stunning designs with our AI-powered creation process
            </p>
          </div>

          <Tabs defaultValue="brief" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="brief">Project Brief</TabsTrigger>
              <TabsTrigger value="mode">Design Mode</TabsTrigger>
              <TabsTrigger value="style">Style & Platform</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
            </TabsList>

            {/* Project Brief Tab */}
            <TabsContent value="brief" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Project Details
                  </CardTitle>
                  <CardDescription>
                    Tell us about your project and what you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="e.g., Summer Campaign 2024"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brief">Design Brief</Label>
                    <Textarea
                      id="brief"
                      placeholder="Describe what you want to create, the message you want to convey, target audience, and any specific requirements..."
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Keywords & Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add a keyword..."
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                      />
                      <Button onClick={addKeyword} size="icon" variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                          {keyword}
                          <button onClick={() => removeKeyword(keyword)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design Mode Tab */}
            <TabsContent value="mode" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Choose Design Mode
                  </CardTitle>
                  <CardDescription>
                    Select the type of design you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {designModes.map((mode) => (
                      <motion.div
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedMode === mode.id
                              ? "ring-2 ring-aakar-green-500 bg-aakar-green-50"
                              : "hover:shadow-md"
                          }`}
                          onClick={() => setSelectedMode(mode.id)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${mode.gradient} flex items-center justify-center`}>
                              <mode.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold mb-2">{mode.title}</h3>
                            <p className="text-sm text-muted-foreground">{mode.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Style & Platform Tab */}
            <TabsContent value="style" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Design Style */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Design Style
                    </CardTitle>
                    <CardDescription>
                      Choose the visual style for your design
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {designStyles.map((style) => (
                        <Card
                          key={style.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedStyle === style.id
                              ? "ring-2 ring-aakar-green-500 bg-aakar-green-50"
                              : "hover:shadow-md"
                          }`}
                          onClick={() => setSelectedStyle(style.id)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1">{style.name}</h4>
                            <p className="text-xs text-muted-foreground">{style.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Platform & Size */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Monitor className="w-5 h-5 mr-2" />
                      Platform & Size
                    </CardTitle>
                    <CardDescription>
                      Select the platform and dimensions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {platforms.map((platform) => (
                        <Card
                          key={platform.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedPlatform === platform.id
                              ? "ring-2 ring-aakar-green-500 bg-aakar-green-50"
                              : "hover:shadow-md"
                          }`}
                          onClick={() => setSelectedPlatform(platform.id)}
                        >
                          <CardContent className="p-4 flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{platform.name}</h4>
                              <p className="text-xs text-muted-foreground">{platform.platform}</p>
                            </div>
                            <Badge variant="outline">{platform.dimensions}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Ready to Generate
                  </CardTitle>
                  <CardDescription>
                    Review your selections and start the AI generation process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">PROJECT</h4>
                      <p className="font-medium">{projectName || "Untitled Project"}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">MODE</h4>
                      <p className="font-medium">
                        {designModes.find(m => m.id === selectedMode)?.title || "Not selected"}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">STYLE</h4>
                      <p className="font-medium">
                        {designStyles.find(s => s.id === selectedStyle)?.name || "Not selected"}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">PLATFORM</h4>
                      <p className="font-medium">
                        {platforms.find(p => p.id === selectedPlatform)?.name || "Not selected"}
                      </p>
                    </div>
                  </div>

                  {/* Brief Preview */}
                  {brief && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">BRIEF</h4>
                      <p className="text-sm">{brief}</p>
                    </div>
                  )}

                  {/* Keywords */}
                  {keywords.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">KEYWORDS</h4>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      size="xl"
                      variant="primary"
                      onClick={handleGenerate}
                      loading={isGenerating}
                      disabled={!selectedMode || !selectedStyle || !selectedPlatform || !brief}
                      className="px-12"
                    >
                      {isGenerating ? (
                        "Generating Your Design..."
                      ) : (
                        <>
                          Generate Design
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
