"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Play, Star, Sparkles, Zap, Users, Palette, Brain, Globe, ArrowRight, CheckCircle, Quote } from "lucide-react"
import { Button } from "@/components/ui/aakar-button"
import Link from "next/link"

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director", 
      company: "Design Studio Inc.",
      content: "Aakar has revolutionized our design workflow. The AI suggestions are incredibly intuitive and save us hours of work.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Brand Manager",
      company: "TechCorp",
      content: "The brand consistency tools in Aakar ensure our visual identity remains cohesive across all touchpoints.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Elena Petrov",
      role: "UX Designer", 
      company: "StartupX",
      content: "From concept to execution, Aakar streamlines every step of the design process. It's like having a creative partner.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    }
  ]

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that understand design principles and generate creative solutions tailored to your brand.",
      highlight: "Smart Suggestions"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Consistency",
      description: "Maintain visual identity across all touchpoints with intelligent brand guideline enforcement and style suggestions.",
      highlight: "Brand Guardian"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "Real-time design generation and editing with industry-leading speed and responsiveness for seamless creativity.",
      highlight: "Instant Results"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Workspace",
      description: "Share, review, and iterate on designs with your team using built-in collaboration tools and feedback systems.",
      highlight: "Team Sync"
    }
  ]

  const designModes = [
    {
      title: "Logo & Branding",
      description: "Create distinctive brand identities with AI-assisted logo generation",
      image: "/api/placeholder/400/300",
      stats: "2M+ logos created"
    },
    {
      title: "Web & Mobile UI",
      description: "Design stunning user interfaces with responsive layouts",
      image: "/api/placeholder/400/300", 
      stats: "500K+ interfaces designed"
    },
    {
      title: "Marketing Materials",
      description: "Generate compelling visuals for campaigns and promotions",
      image: "/api/placeholder/400/300",
      stats: "1M+ materials produced"
    }
  ]

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-aakar-green-50 via-white to-aakar-gold-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-aakar-green-100 text-aakar-green-700 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Design Revolution
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            >
              <span className="text-aakar-green-600">Cultivating</span> Creativity<br />
              <span className="text-aakar-gold-600">Shaping</span> Excellence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your ideas into professional, pixel-perfect designs with the power of advanced AI technology. 
              From concept to creation, Aakar is your intelligent design companion.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Creating Free
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/80 hover:bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium transition-all duration-200"
              >
                <div className="w-12 h-12 bg-aakar-green-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-aakar-green-600 ml-1" />
                </div>
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Floating Design Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-aakar-gold-200 rounded-lg opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 right-16 w-16 h-16 bg-aakar-green-200 rounded-full opacity-20"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Powered by <span className="text-aakar-green-600">Intelligence</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the next generation of design tools with AI that understands your creative vision and amplifies your capabilities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-aakar-green-100 rounded-xl flex items-center justify-center mb-6 text-aakar-green-600 group-hover:bg-aakar-green-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-aakar-gold-100 text-aakar-gold-700 text-xs font-medium rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Modes Showcase */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Design <span className="text-aakar-gold-600">Anything</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From brand identities to digital experiences, Aakar adapts to your creative needs across every design discipline.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designModes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={mode.image} 
                      alt={mode.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{mode.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{mode.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-aakar-green-600 font-medium">{mode.stats}</span>
                      <ArrowRight className="w-5 h-5 text-aakar-green-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-aakar-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <span className="text-aakar-gold-300">Creators</span>
            </h2>
            <p className="text-xl text-aakar-green-100 max-w-3xl mx-auto">
              Join thousands of designers and brands who trust Aakar to bring their creative visions to life.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-12 h-12 text-aakar-gold-300 mx-auto mb-8" />
                
                <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <img 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-4 border-white/20"
                  />
                  <div className="text-left">
                    <div className="font-bold text-xl">{testimonials[currentTestimonial].name}</div>
                    <div className="text-aakar-green-200">{testimonials[currentTestimonial].role}</div>
                    <div className="text-aakar-green-300 text-sm">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-aakar-gold-300 text-aakar-gold-300" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-aakar-gold-300' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-aakar-green-600 to-aakar-green-700 text-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Transform Your <span className="text-aakar-gold-300">Creative Process</span>?
            </h2>
            <p className="text-xl md:text-2xl text-aakar-green-100 mb-12 leading-relaxed">
              Join the design revolution and discover what's possible when human creativity meets artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/sign-up">
                <Button 
                  variant="gold" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  Start Your Free Trial
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/app/dashboard">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  Explore Features
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-aakar-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-aakar-gold-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-aakar-gold-300" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-aakar-gold-300" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
