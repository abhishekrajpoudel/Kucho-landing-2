'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bug, Calendar, Phone, Clock, ArrowRight, Shield, CheckCircle2, 
  ChevronRight, ChevronLeft, Star, User, X, Send, Sparkles, 
  Menu, Calculator, Layers, Flame, MapPin, Facebook, Twitter, 
  Instagram, Linkedin, Plus, Minus, MessageSquare, Search, 
  Award, Activity, Leaf, Check, Quote, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// CONSTANTS & DATA STRUCTURES
// ============================================================================

const SERVICES = [
  {
    id: 'residential',
    title: 'Residential Pest Control',
    subtitle: 'Safe Eco-Friendly Solutions',
    shortDesc: 'Comprehensive, eco-friendly treatment ensuring a clean, pest-free, and healthy home environment.',
    icon: Leaf,
    details: 'Our standard home package provides a protective boundary around your property. We specialize in child and pet-safe methods that target common household pests including ants, spiders, and silverfish without using harsh chemical residues.',
    ecoRating: 5,
    safetyInterval: '6 Months',
    preventionTips: ['Keep food sealed in containers', 'Seal crack gaps in baseboards', 'Keep gutters clear of damp leaves']
  },
  {
    id: 'rodent',
    title: 'Rodent Control',
    subtitle: 'Advanced Extraction & Sealing',
    shortDesc: 'Effective rodent removal solutions including professional mapping, trapping, and exclusion.',
    icon: Shield,
    details: 'Rodents can pose significant health risks and damage structures. Our certified technicians trace nesting points, safely capture pests, and perform critical exclusion repairs to seal all potential entry points.',
    ecoRating: 4,
    safetyInterval: '12 Months',
    preventionTips: ['Prune branches away from rooflines', 'Fix leaking pipes immediately', 'Keep crawlspace vents covered']
  },
  {
    id: 'termite',
    title: 'Termite Control',
    subtitle: 'Structural Protection',
    shortDesc: 'Advanced termite inspection, soil treatments, and durable defensive barriers.',
    icon: Bug,
    details: 'Termites cause millions in property damages. We use state-of-the-art thermal cameras to locate colonies, apply non-repellent soil treatments, and set up continuous baiting defense arrays.',
    ecoRating: 5,
    safetyInterval: '24 Months',
    preventionTips: ['Ensure no wood-to-soil contact', 'Store firewood 20ft away from home', 'Maintain proper basement ventilation']
  },
  {
    id: 'bedbug',
    title: 'Bed Bug Treatment',
    subtitle: 'Thermal Heat Elimination',
    shortDesc: 'Rapid, chemical-free thermal heat treatments targeting bugs at all lifecycle stages.',
    icon: Flame,
    details: 'Bed bug infestations require absolute precision. We employ targeted eco-friendly thermal treatments combined with localized non-toxic spray boundaries to guarantee complete eradication in a single session.',
    ecoRating: 5,
    safetyInterval: 'As needed',
    preventionTips: ['Wash clothes at high temps after travel', 'Inspect second-hand furniture carefully', 'Use defensive mattress encasements']
  },
  {
    id: 'cockroach',
    title: 'Cockroach Mitigation',
    subtitle: 'Deep Sanitation Spraying',
    shortDesc: 'High-efficacy baiting and organic misting targeting kitchen and utility line nests.',
    icon: Activity,
    details: 'Cockroaches are resilient and carry bacteria. We use a multi-pronged strategy featuring safe growth regulators (IGRs), premium gel baits, and precision vacuuming to secure kitchen lines.',
    ecoRating: 4,
    safetyInterval: '3 Months',
    preventionTips: ['Wipe counters daily', 'Avoid keeping standing water in sinks', 'Dispose of waste bags nightly']
  },
  {
    id: 'wildlife',
    title: 'Wildlife Control',
    subtitle: 'Humane Catch & Relocate',
    shortDesc: 'Humane capture and relocation of raccoons, squirrels, bats, and other backyard wildlife.',
    icon: Award,
    details: 'When backyard wildlife enters attics or chimneys, we employ approved humane traps, retrieve the animal safely, relocate them to natural preserves, and install durable chimney shields.',
    ecoRating: 5,
    safetyInterval: 'Per occurrence',
    preventionTips: ['Secure all outdoor garbage bins', 'Install wire mesh under decks', 'Avoid feeding pets outside']
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Schedule Inspection',
    desc: 'Book a certified session via our website or quick hotline. Our team coordinates around your calendar.'
  },
  {
    num: '02',
    title: 'Detailed Property Inspection',
    desc: 'Our certified professionals conduct a thorough 360° inspection to map pest species, entrance ports, and risk zones.'
  },
  {
    num: '03',
    title: 'Customized Treatment Plan',
    desc: 'Based on diagnostics, we draft an eco-friendly action plan using custom products safe for children and pets.'
  },
  {
    num: '04',
    title: 'Prevention & Follow-Up',
    desc: 'After treatment, we establish continuous protection barriers and provide dynamic preventative coaching.'
  }
];

const PRICING_PLANS = [
  {
    name: 'Basic Plan',
    price: '199',
    desc: 'Ideal for small homes or apartments, the Basic Plan offers essential seasonal pest protection.',
    features: ['Weekly inspections & treatments', 'Eco-friendly and child-safe solutions', 'Basic residential insect coverage', 'Single-building boundary spray', 'Email support']
  },
  {
    name: 'Standard Plan',
    price: '299',
    desc: 'Our most popular plan, delivering comprehensive rodent and insect protection for active households.',
    features: ['Weekly inspections & treatments', 'Eco-friendly and child-safe solutions', 'Full pest control coverage for big home', 'Rodent exclusion diagnostics', 'Priority scheduling support', '24/7 Emergency response line'],
    highlighted: true
  },
  {
    name: 'Premium Plan',
    price: '499',
    desc: 'Maximum elite protection, covering wood-boring insects, termites, and advanced exterior wildlife prevention.',
    features: ['Weekly inspections & treatments', 'Eco-friendly and child-safe solutions', 'Full pest control coverage for big home', 'Termite monitoring bait stations', 'Continuous wildlife exterior shields', 'Dedicated personal pest marshal']
  }
];

const TESTIMONIALS = [
  {
    quote: "From the very first inspection, the team was professional and transparent. They explained the pest issue in detail and recommended the right treatment without overselling. Highly recommended!",
    name: "Daniel Brooks",
    role: "Restaurant Manager",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Absolutely outstanding service. With two pets and three young children, safety was our primary concern. Bugfree used purely pet-friendly solutions, and we haven't seen a single ant since!",
    name: "James Walker",
    role: "Homeowner",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Professional equipment, respectful technicians, and prompt timing. They solved a stubborn rodent issue in our crawlspace in less than a week. The follow-up exclusion repair was flawless.",
    name: "Sarah Jenkins",
    role: "Property Manager",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  }
];

const TEAM = [
  {
    name: "John Smith",
    role: "Project Director & Exterminator Lead",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
    exp: "15+ Years"
  },
  {
    name: "Sarah Mitchell",
    role: "Eco-Chemical Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    exp: "8 Years"
  },
  {
    name: "David Lopez",
    role: "Senior Termite & Structural Analyst",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    exp: "12 Years"
  },
  {
    name: "Emma Johnson",
    role: "Rodent Exclusion Technician",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    exp: "6 Years"
  }
];

const FAQS = [
  {
    q: "Do you use eco-friendly and approved pest control chemicals?",
    a: "Yes, we exclusively use products that are eco-friendly, EPA-approved, and thoroughly tested for safety. Our green treatment methods are completely safe for children, dogs, cats, and indoor environments while maintaining a high mortality rate for targeted pests."
  },
  {
    q: "How often should pest control services be scheduled annually?",
    a: "For standard preventative maintenance, we recommend quarterly services (4 times a year). This allows us to establish active protective barriers for each changing season as different pests migrate during cold and warm cycles."
  },
  {
    q: "What preparation is required before starting pest treatment?",
    a: "Preparation depends on the treatment type. Typically, we ask that you clear access to baseboards, cover open foods, store kitchen utensils in cupboards, and keep pets in an untreated area during the service and for 1-2 hours after."
  },
  {
    q: "Do you offer follow-up inspections after pest treatment?",
    a: "Absolutely. All our standard and premium plans include scheduled 14-day check-ups where our experts re-evaluate bait lines, inspect barrier thickness, and ensure the pest cycle is fully disrupted."
  },
  {
    q: "Can pests return after completing the pest control treatment?",
    a: "While our treatments eliminate existing pests and repel newcomers, extreme environmental shifts can occasionally cause pests to try and cross barriers. In those rare events, our plans include a 100% Free Re-treatment Guarantee."
  }
];

const BLOGS = [
  {
    category: 'Guides',
    title: 'A Complete Guide to Common Household Pests in India',
    desc: 'Learn to easily identify, safely track, and proactively manage seasonal pests in urban apartments and suburban homes.',
    img: 'https://images.unsplash.com/photo-1587334206501-789a426fbf0a?auto=format&fit=crop&q=80&w=600',
    date: 'June 24, 2026'
  },
  {
    category: 'Safety',
    title: 'Eco-Friendly Pest Control Solutions That Are Safe for Family & Pets',
    desc: 'Understanding the biology behind botanical insecticides and organic defense barriers that protect your health.',
    img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=600',
    date: 'May 18, 2026'
  },
  {
    category: 'Prevention',
    title: 'Termite Damage Explained: Early Warning Signs Every Homeowner Must Know',
    desc: 'Catch wood damage early. Discover subtle indicators of subterranean termite colonies inside foundation drywall.',
    img: 'https://images.unsplash.com/photo-1516216628859-9bccecad13ca?auto=format&fit=crop&q=80&w=600',
    date: 'April 05, 2026'
  }
];

export default function Page() {
  // ============================================================================
  // STATES
  // ============================================================================
  
  // Navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scheduled Inspections (Stored in state & local storage)
  const [inspections, setInspections] = useState<{
    id: string; name: string; email: string; phone: string; date: string; service: string; status: string;
  }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bugfree_inspections');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', service: 'Residential Pest Control'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [lastBooked, setLastBooked] = useState<any>(null);

  // Estimator Calculator
  const [calcSqft, setCalcSqft] = useState(1500);
  const [calcPest, setCalcPest] = useState('Ants & Crawling Insects');
  const [calcFrequency, setCalcFrequency] = useState('Quarterly Protection');

  // Live estimated pricing computed at render-time (avoiding state synchronisation effects)
  let calcResult = 99;
  if (calcSqft > 3000) calcResult += 120;
  else if (calcSqft > 2000) calcResult += 70;
  else if (calcSqft > 1000) calcResult += 35;

  if (calcPest === 'Termites & Wood-Borers') calcResult += 150;
  else if (calcPest === 'Rodents & Mice') calcResult += 80;
  else if (calcPest === 'Bed Bugs Elimination') calcResult += 110;
  else if (calcPest === 'Wildlife & Relocation') calcResult += 130;

  if (calcFrequency === 'One-Time Outbreak Spray') calcResult += 40;
  else if (calcFrequency === 'Annual Peace-of-Mind') calcResult += 200;

  // Interactive Services Modal
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  // Testimonial Index
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // FAQ Expanded
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Blog Category Filtering
  const [blogFilter, setBlogFilter] = useState('All');

  // AI Pest Advisor Chat Widget
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string; time: string }[]>([
    { 
      role: 'model', 
      text: "Hello! I am your Bugfree AI Pest Advisor. 🐜 Describe any bug you see, ask about prevention tips, or check if an insect is safe!", 
      time: 'Just now' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // EFFECTS & BUSINESS LOGIC
  // ============================================================================

  // Handle page scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync scroll for chat bottom
  useEffect(() => {
    if (aiChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, aiChatOpen, aiTyping]);

  // Handle Inspection form submit
  const handleBookInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all details to schedule an inspection.");
      return;
    }

    setFormLoading(true);

    // Simulate 1.5s network delay
    setTimeout(() => {
      const newBooking = {
        id: `BF-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        service: formData.service,
        status: 'Confirmed'
      };

      const updated = [newBooking, ...inspections];
      setInspections(updated);
      localStorage.setItem('bugfree_inspections', JSON.stringify(updated));
      
      setLastBooked(newBooking);
      setFormLoading(false);
      
      // Reset form
      setFormData({
        name: '', email: '', phone: '', date: '', service: 'Residential Pest Control'
      });
    }, 1500);
  };

  // Handle AI Chat Submission
  const handleSendChatMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || userInput;
    if (!textToSend.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user' as const, text: textToSend, time: timeString };
    
    setChatMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setUserInput('');
    setAiTyping(true);

    try {
      const res = await fetch('/app/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();
      
      const aiMsg = { 
        role: 'model' as const, 
        text: data.text || "I apologize, but my sensory antennas are fuzzy right now. Could you rephrase your question?", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg = { 
        role: 'model' as const, 
        text: "I experienced a connection lapse to the Bugfree database. Please check your network and ask again!", 
        time: "Just now" 
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setAiTyping(false);
    }
  };

  // Pre-fill inspect form from calculator values
  const handleApplyCalculatorQuote = () => {
    setFormData(prev => ({
      ...prev,
      service: calcPest === 'Termites & Wood-Borers' ? 'Termite Control' :
               calcPest === 'Rodents & Mice' ? 'Rodent Control' :
               calcPest === 'Bed Bugs Elimination' ? 'Bed Bug Treatment' :
               'Residential Pest Control'
    }));
    // Scroll smoothly to form
    const elem = document.getElementById('inspection-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      {/* ============================================================================
          NAVIGATION HEADER
          ============================================================================ */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-brand-dark/95 backdrop-blur-md py-4 shadow-lg border-emerald-950/20" : "bg-brand-dark/90 py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-white focus:outline-none">
            <div className="bg-brand-lime p-2 rounded-xl text-brand-dark flex items-center justify-center glow-lime">
              <Bug className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-white leading-none">Bugfree</span>
              <span className="text-[10px] font-mono tracking-widest text-brand-lime font-bold uppercase leading-none mt-1">Pest Solutions</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">About Us</a>
            <a href="#services" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">Services</a>
            <a href="#estimator" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">Cost Estimator</a>
            <a href="#pricing" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">FAQ</a>
            <a href="#blog" className="text-slate-300 hover:text-brand-lime font-medium text-sm transition-colors">Resources</a>
          </div>

          {/* Desktop Call/CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+123456789" className="flex items-center gap-2 text-white hover:text-brand-lime transition-colors">
              <div className="bg-emerald-900/50 p-2 rounded-lg border border-emerald-800">
                <Phone className="w-4 h-4 text-brand-lime" />
              </div>
              <span className="font-mono text-sm font-semibold">+(123) 456-789</span>
            </a>
            <a href="#inspection-section" className="bg-brand-lime text-brand-dark px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-brand-lime-hover transition-all duration-300 flex items-center gap-2 glow-lime font-display">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Nav Trigger */}
          <div className="flex items-center md:hidden gap-4">
            <a href="tel:+123456789" className="text-brand-lime p-2">
              <Phone className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              id="mobile-menu-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Slide-Over */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-brand-dark text-white z-50 p-6 flex flex-col justify-between border-l border-emerald-900"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-emerald-900/50">
                  <div className="flex items-center gap-2">
                    <Bug className="w-6 h-6 text-brand-lime" />
                    <span className="font-display font-bold text-lg">Bugfree</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-6 py-8">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">About Us</a>
                  <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">Our Services</a>
                  <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">Cost Estimator</a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">Pricing Plans</a>
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">FAQs</a>
                  <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-200 hover:text-brand-lime transition-colors">Resources</a>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald-900/50 flex flex-col gap-4">
                <a href="tel:+123456789" className="flex items-center gap-3 font-mono text-slate-300 hover:text-brand-lime text-sm">
                  <Phone className="w-4 h-4 text-brand-lime" /> +(123) 456-789
                </a>
                <a 
                  href="#inspection-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-brand-lime text-brand-dark py-3 rounded-xl font-semibold text-center text-sm hover:bg-brand-lime-hover transition-colors glow-lime block"
                >
                  Schedule Inspection
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================================
          HERO SECTION & BACKGROUND GRAPHICS
          ============================================================================ */}
      <section className="relative pt-36 pb-32 bg-brand-dark text-white overflow-hidden">
        {/* Abstract leaf pattern background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b6f123_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Soft atmospheric green glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-700/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 bg-emerald-950/70 border border-emerald-800/40 px-3.5 py-1.5 rounded-full text-brand-lime font-mono text-xs font-bold tracking-wide uppercase mb-6 w-fit">
                <Shield className="w-3.5 h-3.5" /> Safe, Smart & Sustainable Pest Control
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Advance pest control <br/>
                for <span className="text-brand-lime relative inline-block">safe and hygienic <span className="absolute bottom-2 left-0 right-0 h-1 bg-brand-lime/30 rounded" /></span>
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                With certified technicians and modern treatment methods, we deliver precise pest control solutions that protect your property while prioritizing the safety of your family, pets, and environment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <a 
                  href="#inspection-section" 
                  className="bg-brand-lime text-brand-dark px-8 py-4 rounded-xl font-semibold text-center hover:bg-brand-lime-hover transition-all duration-300 flex items-center justify-center gap-2 glow-lime"
                >
                  Book Service Now <ArrowRight className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setAiChatOpen(true)}
                  className="bg-emerald-900/30 hover:bg-emerald-900/50 text-white border border-emerald-800 px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-brand-lime animate-pulse" /> Ask AI Pest Advisor
                </button>
              </div>

              {/* Trust Indicator Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-emerald-900/60 w-fit">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  ].map((src, i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-brand-dark overflow-hidden">
                      <Image src={src} fill alt="User avatar" className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-brand-lime text-brand-dark flex items-center justify-center font-bold text-xs border-2 border-brand-dark glow-lime">
                    5K+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-slate-300 block mt-1">
                    The Preferred Pest Control Partner for <strong>5,000+ Homes</strong>
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column Graphics / Image representation */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Badge Circular "25 Years" overlay */}
              <div className="absolute top-10 right-4 sm:right-10 z-20 bg-brand-lime text-brand-dark font-display font-extrabold text-sm px-5 py-5 rounded-full border-4 border-brand-dark shadow-xl text-center flex flex-col justify-center items-center leading-tight animate-bounce glow-lime-strong w-28 h-28">
                <span>25+ Years</span>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-80 mt-1">Experience</span>
              </div>

              {/* Main Illustration frame */}
              <div className="relative w-full max-w-md aspect-square bg-emerald-950/40 rounded-3xl border border-emerald-800 p-4 shadow-2xl overflow-hidden">
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
                    fill
                    alt="Pest Control Expert"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  {/* Subtle vignette/gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/20" />
                  
                  {/* Dynamic banner bottom inside image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <div className="bg-brand-lime/20 p-2 rounded-lg text-brand-lime">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm block">Premium Protection</span>
                      <span className="text-slate-400 text-xs">EPA-Approved Green Solvents Only</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          FLOATING SCHEDULER & BOOKINGS PANEL
          ============================================================================ */}
      <section id="inspection-section" className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl shadow-2xl overflow-hidden border border-emerald-900/35 glow-lime">
            
            {/* Form Side */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Schedule an Inspection</h3>
                  <p className="text-slate-500 text-sm mt-1">Instant confirmation. Our experts trace core entry ports.</p>
                </div>
                {inspections.length > 0 && (
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {inspections.length} Scheduled
                  </span>
                )}
              </div>

              <form onSubmit={handleBookInspection} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Full name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter Email Address" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Enter Phone Number" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inspection Date *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Select Service</label>
                  <select 
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all appearance-none"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-semibold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formLoading ? (
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Inspection Now <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Contact Info Side */}
            <div className="lg:col-span-4 bg-brand-dark text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/5 rounded-full blur-2xl" />
              
              <div>
                <span className="text-xs font-mono text-brand-lime font-bold uppercase tracking-wider">Need Immediate Support?</span>
                <h4 className="text-3xl font-display font-extrabold mt-2 leading-none">Call Us Now</h4>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Our professional team is active 24/7. Connect with our marshals to schedule instant emergency sprays.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="bg-brand-lime p-3 rounded-2xl text-brand-dark shadow-lg">
                  <Phone className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-white block">+(123) 456-789</span>
                  <span className="text-xs text-brand-lime font-mono">Toll-free 24-hr Emergency Hotline</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Tracker Overlay Banner */}
      <AnimatePresence>
        {lastBooked && (
          <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-40 bg-brand-dark text-white p-6 rounded-2xl border border-brand-lime shadow-2xl overflow-hidden glow-lime">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b6f123_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-3">
                <div className="bg-brand-lime p-2 rounded-xl text-brand-dark flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Inspection Scheduled!</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Reference ID: <strong className="text-brand-lime">{lastBooked.id}</strong></p>
                </div>
              </div>
              <button onClick={() => setLastBooked(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 border-t border-emerald-900/60 pt-4 relative z-10">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Assigned For</span>
                  <span className="text-slate-200 font-medium truncate block">{lastBooked.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date Scheduled</span>
                  <span className="text-slate-200 font-medium block">{lastBooked.date}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Service Selected</span>
                  <span className="text-slate-200 font-medium block truncate">{lastBooked.service}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setLastBooked(null);
                // Scroll to contact FAQ
                const elem = document.getElementById('faq');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 w-full bg-brand-lime/15 hover:bg-brand-lime/25 text-brand-lime py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              Have questions about preparations? <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================================
          ABOUT COMPANY & ECO QUALITY TABS
          ============================================================================ */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side Images and Reviews badge */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-square bg-[#fafbfa] rounded-3xl border border-slate-100 p-3 shadow-xl overflow-hidden z-10">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
                    fill
                    alt="Spraying Service"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Smaller floating overlapping image */}
              <div className="absolute -bottom-8 -left-6 w-1/2 aspect-video bg-white rounded-2xl p-2 shadow-2xl z-20 border border-slate-100 hidden sm:block">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400"
                    fill
                    alt="Technician work"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Customer Review Badge */}
              <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-20 flex flex-col items-center text-center">
                <div className="bg-emerald-50 text-emerald-800 text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-1">
                  Best Service
                </div>
                <span className="text-3xl font-display font-extrabold text-slate-900 leading-none">4.9</span>
                <div className="flex items-center gap-0.5 text-amber-400 my-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Customer Reviews</span>
                <a href="#testimonials" className="text-brand-dark hover:text-emerald-700 text-xs font-semibold underline mt-2">Read testimonials</a>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-brand-lime inline-block" /> About Our Company
              </span>
              
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Committed to safe, effective <br className="hidden sm:inline" />
                & timely pest control
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Our team is dedicated to providing prompt and professional pest control services for homes and businesses. We combine technical knowledge with practical solutions. Every treatment is backed by science and certified environmental safeguards.
              </p>

              {/* Two pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-brand-lime/20 text-brand-dark p-3 rounded-xl h-fit">
                    <Shield className="w-5 h-5 text-emerald-900" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">Trusted Expertise</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">We follow proven methods & industry standards to deliver reliable, safe, and robust pest barriers.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-brand-lime/20 text-brand-dark p-3 rounded-xl h-fit">
                    <CheckCircle2 className="w-5 h-5 text-emerald-900" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">Safety-First Approach</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">We prioritize the health of your family, employees, pets, and localized ecosystems.</p>
                  </div>
                </div>
              </div>

              {/* Blockquote block */}
              <div className="relative border-l-4 border-brand-lime bg-brand-accent p-6 rounded-r-2xl mb-8">
                <Quote className="absolute right-6 top-6 w-12 h-12 text-brand-lime opacity-30" />
                <p className="text-brand-dark font-medium italic text-sm leading-relaxed relative z-10">
                  &ldquo;We are committed to delivering professional pest control solutions that go beyond quick fixes. Through detailed inspections, responsible treatment methods, and preventative strategies, we protect homes.&rdquo;
                </p>
              </div>

              <a 
                href="#services" 
                className="inline-flex items-center gap-2 bg-brand-lime hover:bg-brand-lime-hover text-brand-dark font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-300 glow-lime"
              >
                More About Us <ArrowRight className="w-4 h-4" />
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          INTERACTIVE COST ESTIMATOR CALCULATOR
          ============================================================================ */}
      <section id="estimator" className="py-20 bg-brand-accent/50 border-y border-emerald-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
              <Calculator className="w-3.5 h-3.5" /> Direct Transparency
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">Pest Control Cost Estimator</h2>
            <p className="text-slate-500 text-sm mt-2">Adjust your space dimensions and pest challenges for a custom estimated price barrier.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Inputs Column */}
              <div className="flex flex-col gap-6">
                
                {/* SQFT Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Property Size (Sq Ft)</label>
                    <span className="font-mono text-sm font-bold text-slate-950 bg-slate-100 px-2.5 py-1 rounded-md">{calcSqft.toLocaleString()} Sq Ft</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="100"
                    value={calcSqft}
                    onChange={e => setCalcSqft(Number(e.target.value))}
                    className="w-full accent-brand-dark h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>500 sqft</span>
                    <span>2,500 sqft</span>
                    <span>5,000 sqft</span>
                  </div>
                </div>

                {/* Pest Selection Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Pest Threat</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Ants & Crawling Insects',
                      'Rodents & Mice',
                      'Termites & Wood-Borers',
                      'Bed Bugs Elimination',
                      'Cockroach Misting',
                      'Wildlife & Relocation'
                    ].map(type => (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => setCalcPest(type)}
                        className={cn(
                          "px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all",
                          calcPest === type 
                            ? "bg-brand-dark text-white border-brand-dark shadow-md" 
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Frequency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['One-Time Outbreak Spray', 'Quarterly Protection', 'Annual Peace-of-Mind'].map(freq => (
                      <button 
                        key={freq}
                        type="button"
                        onClick={() => setCalcFrequency(freq)}
                        className={cn(
                          "px-2.5 py-2 text-[10px] sm:text-xs font-semibold rounded-xl border text-center transition-all flex flex-col justify-center items-center gap-1",
                          calcFrequency === freq 
                            ? "bg-brand-lime text-brand-dark border-brand-lime font-bold shadow-md" 
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                        )}
                      >
                        {freq}
                        {freq === 'Quarterly Protection' && (
                          <span className="bg-brand-dark text-brand-lime px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase font-extrabold block">Best Deal</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Live Output Price Quote Column */}
              <div className="bg-brand-dark rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-lime uppercase font-bold block">Dynamic Estimate Quote</span>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-sm font-semibold">$</span>
                    <span className="text-5xl font-display font-extrabold text-white tracking-tight">{calcResult}</span>
                    <span className="text-slate-400 text-xs font-mono">/ Visit Est</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                    Estimates are calculated using regional labor standards and standard green chemicals. Actual price may vary upon physical soil assessment.
                  </p>
                </div>

                <div className="mt-8 border-t border-emerald-900/60 pt-6">
                  <span className="text-xs font-semibold text-brand-lime block mb-2">Estimate Includes:</span>
                  <ul className="text-xs text-slate-300 flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-lime" /> Standard interior baseboard sprays
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-lime" /> Custom child-safe bait arrays set-up
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-lime" /> 30-day Free Re-spray guarantee coverage
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={handleApplyCalculatorQuote}
                  className="mt-6 w-full bg-brand-lime text-brand-dark py-3.5 rounded-xl font-bold text-sm hover:bg-brand-lime-hover transition-colors flex items-center justify-center gap-2 glow-lime"
                >
                  Schedule Free Site Inspection <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================================
          SERVICES CAROUSEL / DETAIL EXPANSION
          ============================================================================ */}
      <section id="services" className="py-24 bg-[#fafbfa] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-brand-lime inline-block" /> Our Services
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Reliable pest control services <br className="hidden sm:inline" />
                for homes & businesses
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 max-w-xs text-right hidden lg:block">
                All treatments utilize premium botanically synthesized compounds.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div 
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 hover:border-brand-lime shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-brand-accent p-4 rounded-2xl w-fit text-brand-dark group-hover:bg-brand-lime group-hover:text-brand-dark transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 mt-6 group-hover:text-emerald-950 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-semibold tracking-wider uppercase">{s.subtitle}</p>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed line-clamp-3">
                      {s.shortDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-brand-dark font-semibold text-xs group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="flex gap-0.5 text-brand-lime">
                      {[...Array(s.ecoRating)].map((_, i) => (
                        <Leaf key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>🌟 Reliable pest control services eliminating pests with expert care...</span>
              <a href="#inspection-section" className="text-brand-dark hover:text-emerald-700 font-bold underline flex items-center gap-1">
                View All Services & Schedule <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* Services Detail Popup Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-50 border border-slate-100 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div className="flex gap-4 items-center">
                  <div className="bg-brand-lime text-brand-dark p-3 rounded-2xl">
                    <selectedService.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900">{selectedService.title}</h3>
                    <p className="text-xs text-brand-lime font-mono uppercase bg-brand-dark px-2 py-0.5 rounded-md mt-1 w-fit font-bold">{selectedService.subtitle}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedService(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">Service Overview</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedService.details}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Eco Safety Rating</span>
                    <div className="flex items-center gap-1 mt-1 text-emerald-700">
                      {[...Array(selectedService.ecoRating)].map((_, i) => <Leaf key={i} className="w-4 h-4 fill-current" />)}
                      <span className="text-xs font-mono font-bold ml-1">Organic</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Barrier Durability</span>
                    <span className="text-xs font-mono font-bold text-slate-800 mt-1 block">{selectedService.safetyInterval} Duration</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-3">Self-Prevention Tips</span>
                  <ul className="space-y-2 text-slate-600 text-xs">
                    {selectedService.preventionTips.map((tip, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-lime bg-brand-dark p-0.5 rounded-full" /> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, service: selectedService.title }));
                    setSelectedService(null);
                    const elem = document.getElementById('inspection-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-brand-lime text-brand-dark py-3 rounded-xl font-bold text-sm text-center hover:bg-brand-lime-hover transition-colors glow-lime"
                >
                  Schedule with {selectedService.title}
                </button>
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setAiChatOpen(true);
                    handleSendChatMessage(`How do I prevent ${selectedService.title.toLowerCase()} in my home?`);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 rounded-xl text-sm flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" /> Ask AI
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================================
          WHY CHOOSE US (EXPERT METRICS SECTION)
          ============================================================================ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text and list */}
            <div className="lg:col-span-6">
              <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-brand-lime inline-block" /> Why Choose Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Expert led pest control you <br className="hidden sm:inline" />
                can depend on
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Our experienced technicians follow a structured inspection and treatment process to ensure pests are eliminated safely and effectively.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    title: 'Safe & Eco-Friendly Solutions',
                    desc: 'We use approved, environmentally responsible treatments that eliminate pests while keeping your family, pets, and surroundings safe.'
                  },
                  {
                    title: 'Thorough Inspection & Assessment',
                    desc: 'We diagnose hidden hives, termite foundations, and rodent entry paths first to create structural blocks.'
                  },
                  {
                    title: 'Long-Term Prevention Support',
                    desc: 'We don\'t just spray and leave. We teach exclusion tactics and provide seasonal protective boundaries.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-brand-lime/10 text-brand-dark p-2 rounded-xl h-fit">
                      <Check className="w-4 h-4 text-emerald-950 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a 
                href="#inspection-section" 
                className="bg-brand-lime text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-lime-hover transition-colors inline-flex items-center gap-2 glow-lime text-sm"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right side graphical showcase */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] bg-slate-50 rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
                  fill
                  alt="Technician spraying"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Overlay Metric box */}
                <div className="absolute bottom-6 left-6 right-6 bg-brand-dark/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center justify-between text-white">
                  <div>
                    <span className="text-brand-lime font-mono text-xs font-bold block">Certified Professionals</span>
                    <span className="text-lg font-display font-bold mt-1 block">100% Guaranteed</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-1">4.9/5 Average Rating</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          DARK GREEN BANNER (Pest Control Difference)
          ============================================================================ */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#b6f123_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-brand-lime font-mono text-xs font-bold tracking-widest uppercase block mb-3">Our Expert Team</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Why our pest control <br className="hidden sm:inline" />
                services make a difference
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
                We deliver more than just pest removal. Our services are designed to provide safety, reliability, and long-term protection, ensuring your home or business stays pest free.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-brand-dark-light border border-emerald-800/40 p-5 rounded-2xl">
                  <div className="bg-brand-lime/10 p-2.5 rounded-xl w-fit text-brand-lime mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Fast & Reliable Service</h4>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">We respond quickly to minimize disruption to your home or office space.</p>
                </div>

                <div className="bg-brand-dark-light border border-emerald-800/40 p-5 rounded-2xl">
                  <div className="bg-brand-lime/10 p-2.5 rounded-xl w-fit text-brand-lime mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Targeted Pest Solutions</h4>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">We use special methods tailored to each type of pest.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end">
              <div className="relative w-full max-w-sm aspect-square bg-emerald-950/40 rounded-3xl border border-emerald-800/60 p-4">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"
                    fill
                    alt="Spraying tools"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 mr-4 bg-brand-dark-light py-3 px-6 rounded-2xl border border-emerald-800/50">
                <span className="font-display font-black text-2xl text-brand-lime">4.9/5</span>
                <div className="w-px h-6 bg-emerald-800" />
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <span className="text-xs text-slate-300 font-medium">Our 4200 Reviews</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          PROVEN PROCESS TIMELINE (From Inspection to Protection)
          ============================================================================ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest bg-brand-lime/25 px-3.5 py-1.5 rounded-full">
              How It Works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
              From inspection to protection <br />
              our proven process
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">We handle each household diagnostics systematically to assure absolute eradication results.</p>
          </div>

          {/* Stepper Cards */}
          <div className="relative">
            {/* Background Connector Line for desktop */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="bg-[#fafbfa] border border-slate-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all relative">
                  <div className="absolute -top-5 left-6 bg-brand-dark text-brand-lime font-mono font-bold text-xs px-3.5 py-1 rounded-full border-2 border-brand-lime">
                    {step.num}
                  </div>
                  
                  <h4 className="font-display font-extrabold text-slate-900 text-lg mt-4 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================================
          PRICING PLANS
          ============================================================================ */}
      <section id="pricing" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-brand-lime inline-block" /> Our Pricing Plans
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Affordable pest control plan <br className="hidden sm:inline" />
                with transparent pricing
              </h2>
            </div>
            <div>
              <a 
                href="#inspection-section" 
                className="bg-brand-lime text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-lime-hover transition-colors inline-flex items-center gap-2 glow-lime text-sm"
              >
                View All Pricing Plans <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <div 
                key={i}
                className={cn(
                  "rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between shadow-lg",
                  plan.highlighted 
                    ? "bg-brand-dark text-white border-brand-lime scale-105 z-10 glow-lime" 
                    : "bg-white text-slate-800 border-slate-100 hover:border-slate-300"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lime text-brand-dark px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 className={cn("font-display font-extrabold text-xl", plan.highlighted ? "text-brand-lime" : "text-slate-900")}>
                    {plan.name}
                  </h4>
                  <p className={cn("text-xs mt-2 leading-relaxed", plan.highlighted ? "text-slate-300" : "text-slate-500")}>
                    {plan.desc}
                  </p>

                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-sm font-semibold">$</span>
                    <span className={cn("text-4xl sm:text-5xl font-display font-black tracking-tight", plan.highlighted ? "text-white" : "text-slate-900")}>{plan.price}.00</span>
                    <span className={cn("text-xs font-mono", plan.highlighted ? "text-slate-400" : "text-slate-500")}>/Monthly</span>
                  </div>

                  <div className={cn("h-px w-full my-6", plan.highlighted ? "bg-emerald-900/60" : "bg-slate-100")} />

                  <ul className="space-y-3.5 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={cn("w-4 h-4 rounded-full p-0.5 shrink-0 mt-0.5", plan.highlighted ? "bg-brand-lime text-brand-dark" : "bg-brand-dark text-brand-lime")} />
                        <span className={plan.highlighted ? "text-slate-200" : "text-slate-600"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: `${plan.name} Coverage` }));
                      const elem = document.getElementById('inspection-section');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold text-sm transition-colors text-center",
                      plan.highlighted 
                        ? "bg-brand-lime text-brand-dark hover:bg-brand-lime-hover glow-lime" 
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    Get Started With Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Plan assurances */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-lime bg-brand-dark p-0.5 rounded-full" /> Get 30 day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-lime bg-brand-dark p-0.5 rounded-full" /> No any hidden fees pay</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-lime bg-brand-dark p-0.5 rounded-full" /> You can cancel anytime</span>
          </div>

        </div>
      </section>

      {/* ============================================================================
          TESTIMONIALS (DARK GREEN BANNER CAROUSEL)
          ============================================================================ */}
      <section id="testimonials" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b6f123_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-5">
              <span className="text-brand-lime font-mono text-xs font-bold tracking-widest uppercase block mb-3">Our Testimonials</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Trust by thousand <br />
                of satisfied clients
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-sm">
                Check genuine remarks from home, corporate, and restaurant owners who established their active defense with us.
              </p>

              <div className="flex items-center gap-3 mt-8">
                <button 
                  onClick={() => setTestimonialIdx(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="bg-emerald-950 hover:bg-brand-lime hover:text-brand-dark border border-emerald-800 p-3 rounded-xl transition-all text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setTestimonialIdx(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="bg-emerald-950 hover:bg-brand-lime hover:text-brand-dark border border-emerald-800 p-3 rounded-xl transition-all text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-400 font-mono ml-3">
                  {testimonialIdx + 1} / {TESTIMONIALS.length} Reviews
                </span>
              </div>
            </div>

            {/* Testimonial Active Display Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testimonialIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brand-dark-light border border-emerald-800/60 p-6 sm:p-8 rounded-3xl relative"
                >
                  <Quote className="absolute right-6 bottom-6 w-16 h-16 text-brand-lime opacity-5 pointer-events-none" />
                  
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(TESTIMONIALS[testimonialIdx].stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed mb-6 font-medium">
                    &ldquo;{TESTIMONIALS[testimonialIdx].quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 border-t border-emerald-900/60 pt-6">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-800/40">
                      <Image 
                        src={TESTIMONIALS[testimonialIdx].avatar} 
                        fill 
                        alt="Customer avatar" 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="font-display font-bold text-white text-sm block">{TESTIMONIALS[testimonialIdx].name}</span>
                      <span className="text-xs text-brand-lime font-mono mt-0.5 block">{TESTIMONIALS[testimonialIdx].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          TEAM SECTION
          ============================================================================ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest bg-brand-lime/25 px-3.5 py-1.5 rounded-full">
              Our Expert Team
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
              Meet the professionals behind <br />
              our pest control success
            </h2>
            <p className="text-slate-500 text-sm mt-2">All crew members undergo rigorous licensing, background inspections, and eco-chemical safety seminars.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md group hover:border-brand-lime transition-all duration-300">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image 
                    src={member.image} 
                    fill 
                    alt={member.name} 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-mono font-semibold text-brand-lime bg-brand-dark px-2.5 py-1 rounded-full">
                      Licensed Expert • {member.exp}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center bg-white">
                  <h4 className="font-display font-bold text-slate-950 text-base leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono tracking-wider mt-1.5 uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================================
          INTERACTIVE ACCORDION FAQ SECTION
          ============================================================================ */}
      <section id="faq" className="py-24 bg-[#fafbfa] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column visual widget */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest bg-brand-lime/25 px-3 py-1 rounded-full">
                  Frequently Asked Questions
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
                  Helpful information to <br className="hidden sm:inline" />
                  guide your pest control <br className="hidden sm:inline" />
                  decision
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
                  Yes, we use eco-friendly and government-approved pest control chemicals that are safe for children, pets, and the environment. Our treatments are carefully selected.
                </p>
              </div>

              {/* Help box */}
              <div className="bg-brand-dark rounded-2xl p-6 text-white border border-brand-lime mt-8 glow-lime relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-display font-bold text-base text-brand-lime flex items-center gap-2">
                  <Activity className="w-5 h-5 animate-pulse" /> Still Have Questions?
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Connect instantly to our real-time AI advisor drawer on the bottom right or call us directly.
                </p>
                <div className="mt-4 flex gap-3">
                  <button 
                    onClick={() => setAiChatOpen(true)}
                    className="bg-brand-lime text-brand-dark px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-lime-hover transition-colors"
                  >
                    Open AI Advisor
                  </button>
                  <a 
                    href="tel:+123456789"
                    className="bg-emerald-950 hover:bg-emerald-900 text-white border border-emerald-800 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Hotline
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Accordion List */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="space-y-4">
                {FAQS.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className={cn(
                        "rounded-2xl border transition-all duration-300",
                        isOpen ? "bg-brand-accent border-brand-lime/40 shadow-md" : "bg-white border-slate-100 hover:border-slate-300"
                      )}
                    >
                      <button 
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none"
                      >
                        <span className="font-display font-bold text-slate-900 text-sm sm:text-base">
                          {idx + 1}. {faq.q}
                        </span>
                        <span className="bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg text-slate-600 shrink-0">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/50">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          FILTERABLE BLOG / RESOURCES SECTION
          ============================================================================ */}
      <section id="blog" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono text-brand-dark font-extrabold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-brand-lime inline-block" /> Latest Blog
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Stay informed with our pest <br />
                control knowledge hub
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Guides', 'Safety', 'Prevention'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setBlogFilter(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300",
                    blogFilter === cat 
                      ? "bg-brand-lime text-brand-dark shadow-md glow-lime font-bold" 
                      : "bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.filter(b => blogFilter === 'All' || b.category === blogFilter).map((b, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image 
                      src={b.img} 
                      fill 
                      alt={b.title} 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-brand-dark text-brand-lime font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {b.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono text-slate-400 block mb-2">{b.date} • By Certified Marshal</span>
                    <h4 className="font-display font-bold text-slate-950 text-base group-hover:text-emerald-800 transition-colors leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <button 
                    onClick={() => {
                      setAiChatOpen(true);
                      handleSendChatMessage(`What is the core advice of the blog titled "${b.title}"?`);
                    }}
                    className="text-brand-dark font-bold text-xs hover:text-emerald-700 transition-colors flex items-center gap-1.5"
                  >
                    Read & Summarize <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================================
          INTERACTIVE AI PEST ADVISOR (FLOATING PANEL / DRAWER)
          ============================================================================ */}
      
      {/* Floating Action Trigger */}
      <button 
        onClick={() => setAiChatOpen(!aiChatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-brand-dark hover:bg-brand-lime hover:text-brand-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-brand-lime focus:outline-none scale-105 glow-lime-strong group"
        title="Ask AI Pest Advisor"
      >
        <span className="absolute -left-36 bg-brand-dark text-white text-[10px] font-bold py-1.5 px-3 rounded-lg border border-brand-lime group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline tracking-wider">
          💡 ASK AI PEST ADVISOR
        </span>
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* AI Chat Drawer */}
      <AnimatePresence>
        {aiChatOpen && (
          <>
            {/* Click-out side overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiChatOpen(false)}
              className="fixed inset-0 bg-black z-40 hidden sm:block"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-brand-dark text-white shadow-2xl border-l border-emerald-900/40 z-50 flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="bg-brand-dark-light border-b border-emerald-900/60 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-lime p-2 rounded-xl text-brand-dark flex items-center justify-center glow-lime">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-white text-base leading-none">AI Pest Advisor</h4>
                    <span className="text-[9px] font-mono tracking-widest text-brand-lime uppercase font-bold block mt-1">Powered by Gemini 3.5</span>
                  </div>
                </div>
                <button onClick={() => setAiChatOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-emerald-950/40">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Lists */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                
                {chatMessages.map((msg, i) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div key={i} className={cn("flex flex-col max-w-[85%]", isUser ? "ml-auto items-end" : "mr-auto items-start")}>
                      <span className="text-[9px] text-slate-400 font-mono mb-1">{isUser ? 'You' : 'Advisor'} • {msg.time}</span>
                      <div className={cn(
                        "rounded-2xl p-4 text-xs sm:text-sm leading-relaxed",
                        isUser 
                          ? "bg-brand-lime text-brand-dark font-medium rounded-tr-none" 
                          : "bg-brand-dark-light text-slate-100 border border-emerald-900/40 rounded-tl-none whitespace-pre-wrap"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {aiTyping && (
                  <div className="flex flex-col mr-auto items-start max-w-[85%]">
                    <span className="text-[9px] text-slate-400 font-mono mb-1">Advisor is thinking...</span>
                    <div className="bg-brand-dark-light border border-emerald-900/40 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                
                <div ref={chatBottomRef} />
              </div>

              {/* Drawer Bottom controls (Prompt suggestions & Inputs) */}
              <div className="p-4 bg-brand-dark-light border-t border-emerald-900/60 flex flex-col gap-3">
                
                {/* Suggestions Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    "Is termite damage reversible?",
                    "Are organic pest sprays safe?",
                    "How to seal mice holes?"
                  ].map((sugg, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSendChatMessage(sugg)}
                      className="bg-brand-dark border border-emerald-800 text-[10px] text-slate-300 px-3 py-1.5 rounded-full hover:bg-brand-lime hover:text-brand-dark hover:border-brand-lime font-medium shrink-0 transition-colors"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>

                {/* Input block */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask about pest symptoms, identification, or safety..."
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                    className="flex-1 bg-brand-dark border border-emerald-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-lime focus:border-brand-lime text-white"
                  />
                  <button 
                    onClick={() => handleSendChatMessage()}
                    className="bg-brand-lime text-brand-dark p-3 rounded-xl hover:bg-brand-lime-hover transition-colors flex items-center justify-center glow-lime"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[9px] text-slate-400 font-mono text-center">
                  Always secure. In emergencies, call standard dispatcher +(123) 456-789.
                </span>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================================
          FOOTER DESIGN
          ============================================================================ */}
      <footer className="bg-brand-dark text-white border-t border-emerald-950 pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#b6f123_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Quick Details row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-emerald-900/60 mb-16">
            
            <div className="flex items-center gap-4">
              <div className="bg-brand-lime/15 p-3 rounded-2xl text-brand-lime">
                <Bug className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-black text-lg block">Bugfree</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">Pest control solutions</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-brand-lime/15 p-3 rounded-2xl text-brand-lime">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block font-semibold uppercase font-mono">Email Address:</span>
                <a href="mailto:info@domainname.com" className="text-sm font-semibold hover:text-brand-lime transition-colors mt-0.5 block">info@domainname.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-brand-lime/15 p-3 rounded-2xl text-brand-lime">
                <Phone className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block font-semibold uppercase font-mono">Phone Number:</span>
                <a href="tel:+123456789" className="text-sm font-semibold hover:text-brand-lime transition-colors mt-0.5 block">+(123) 456-789</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-brand-lime/15 p-3 rounded-2xl text-brand-lime">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block font-semibold uppercase font-mono">Working Hours:</span>
                <span className="text-sm font-semibold text-slate-200 mt-0.5 block">Mon - Sat: 09:00 AM - 05:00 PM</span>
              </div>
            </div>

          </div>

          {/* Nav Links Column lists */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Description / Social */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Our certified technicians use eco-friendly methods to eliminate pests. We secure structural foundations, trace entry ports, and establish permanent protective barriers.
                </p>
              </div>
              
              <div className="mt-8">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">Follow Us On Socials:</span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="bg-brand-dark-light hover:bg-brand-lime hover:text-brand-dark border border-emerald-800 p-3 rounded-xl text-slate-300 transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-2">
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-4 text-xs font-semibold text-slate-400">
                <li><a href="#" className="hover:text-brand-lime transition-colors">★ Home</a></li>
                <li><a href="#about" className="hover:text-brand-lime transition-colors">★ About Us</a></li>
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Our Services</a></li>
                <li><a href="#blog" className="hover:text-brand-lime transition-colors">★ Our Projects</a></li>
                <li><a href="#pricing" className="hover:text-brand-lime transition-colors">★ Pricing Plans</a></li>
              </ul>
            </div>

            {/* Our Services links */}
            <div className="md:col-span-3">
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider mb-6">Our Services</h4>
              <ul className="space-y-4 text-xs font-semibold text-slate-400">
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Residential Pest Control</a></li>
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Bed Bug Treatment</a></li>
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Rodent Control</a></li>
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Cockroach & Ant Control</a></li>
                <li><a href="#services" className="hover:text-brand-lime transition-colors">★ Termite Control</a></li>
              </ul>
            </div>

            {/* Newsletter block */}
            <div className="md:col-span-3">
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider mb-6">Subscribe To Our Newsletter</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                * We believe quality pest control should be affordable and straight forward. Our plans come.
              </p>
              
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter Email Address"
                  className="flex-1 bg-brand-dark-light border border-emerald-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-lime focus:border-brand-lime text-white"
                />
                <button 
                  onClick={() => alert("Thank you for subscribing to our Newsletter!")}
                  className="bg-brand-lime text-brand-dark p-3 rounded-xl hover:bg-brand-lime-hover transition-colors flex items-center justify-center glow-lime"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Legal links */}
          <div className="border-t border-emerald-900/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <span>Copyright © 2026 Bugfree. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <span>★</span>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms & Conditions</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
