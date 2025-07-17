"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/aakar-button';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Palette, 
  Layout, 
  Wand2,
  Users,
  Star,
  ChevronRight,
  Play
} from 'lucide-react';

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description: "Transform your ideas into stunning designs with our advanced AI engine powered by cutting-edge LLMs and image generation models.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Intelligence",
      description: "Maintains perfect brand consistency across all designs with our proprietary Design Principle Engine and brand guideline integration.",
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Smart Composition",
      description: "Applies design principles like Rule of Thirds, Golden Ratio, and optimal typography hierarchies automatically.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Work seamlessly with your team, get instant AI suggestions, and iterate designs faster than ever before.",
    },
  ];

  const designModes = [
    { name: "Branding", description: "Logos, brand kits, style guides", image: "/api/placeholder/300/200" },
    { name: "UI/UX", description: "Web interfaces, mobile apps", image: "/api/placeholder/300/200" },
    { name: "Social Media", description: "Posts, stories, covers", image: "/api/placeholder/300/200" },
    { name: "Print Design", description: "Flyers, business cards, posters", image: "/api/placeholder/300/200" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      company: "TechFlow Inc.",
      content: "Aakar has revolutionized our design workflow. What used to take days now takes hours, and the quality is consistently outstanding.",
      avatar: "/api/placeholder/50/50",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      company: "NextGen Solutions",
      content: "As a non-designer, Aakar empowers me to create professional-grade designs that perfectly match our brand. It's game-changing.",
      avatar: "/api/placeholder/50/50",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Marketing Manager",
      company: "Creative Studios",
      content: "The AI suggestions are incredibly smart. It feels like having a senior designer guiding every decision.",
      avatar: "/api/placeholder/50/50",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden aakar-hero-section">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-aakar-green-50 border border-aakar-green-200 rounded-full px-6 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-aakar-green-600" />
              <span className="text-sm font-medium text-aakar-green-700">Introducing Aakar AI v2.0</span>
              <ChevronRight className="w-4 h-4 text-aakar-green-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-balance mb-6"
            >
              The AI-Powered{' '}
              <span className="aakar-text-gradient">Design Companion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto"
            >
              Cultivating Creativity. Shaping Excellence. Transform your ideas into professional, 
              pixel-perfect designs across all creative disciplines with our advanced AI engine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button size="xl" asChild className="group">
                <Link href="/create">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="secondary" size="xl" asChild>
                <Link href="/explore">
                  Explore Gallery
                </Link>
              </Button>
            </motion.div>

            {/* Demo Video/Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl">
                <div className="relative bg-gradient-to-br from-aakar-green-50 to-aakar-gold-50 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
                  {!isVideoPlaying ? (
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="group flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 text-aakar-green-600 ml-1 group-hover:text-aakar-green-700" />
                    </button>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-aakar-green-100 to-aakar-gold-100 flex items-center justify-center">
                      <p className="text-aakar-green-700 font-medium">Demo Video Playing...</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-aakar-gold-400 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-aakar-green-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of design with our cutting-edge AI that understands your vision
              and brings it to life with professional precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl border border-border hover:border-aakar-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-aakar-green-100 to-aakar-green-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-aakar-green-200 group-hover:to-aakar-green-300 transition-all">
                  <div className="text-aakar-green-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-heading font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Modes Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Master Every Design Discipline
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From branding to UI/UX, our AI adapts to any creative challenge with specialized 
              intelligence for each design category.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designModes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-aakar-green-200 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-aakar-green-50 to-aakar-gold-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-aakar-green-600 to-aakar-green-700 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{mode.name}</h3>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <Button variant="secondary" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      Explore {mode.name}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of designers, marketers, and creators who are transforming 
              their creative process with Aakar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border hover:border-aakar-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-aakar-gold-400 text-aakar-gold-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-aakar-green-400 to-aakar-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 aakar-hero-section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Transform Your Creative Process?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the AI design revolution. Start creating professional designs 
              that perfectly capture your vision in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" asChild className="group">
                <Link href="/sign-up">
                  <Users className="w-5 h-5 mr-2" />
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="secondary" size="xl" asChild>
                <Link href="/explore/ai-options">
                  Learn About Our AI
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
