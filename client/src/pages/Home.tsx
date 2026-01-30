import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertLeadSchema, insertSubscriptionSchema, type InsertLead, type InsertSubscription, type Project, type Client } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Menu, 
  X,
  ArrowRight,
  Mail
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  // Queries
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: [api.projects.list.path] });
  const { data: clients = [] } = useQuery<Client[]>({ queryKey: [api.clients.list.path] });

  // Mutations
  const createLead = useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  });

  const createSubscription = useMutation({
    mutationFn: async (data: InsertSubscription) => {
      const res = await fetch(api.subscriptions.create.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }
  });

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: { name: "", email: "", phone: "", city: "" },
  });

  const subForm = useForm<InsertSubscription>({
    resolver: zodResolver(insertSubscriptionSchema),
    defaultValues: { email: "" },
  });

  function onLeadSubmit(data: InsertLead) {
    createLead.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({ title: "Inquiry sent successfully!" });
      },
      onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message })
    });
  }

  function onSubSubmit(data: InsertSubscription) {
    createSubscription.mutate(data, {
      onSuccess: () => {
        subForm.reset();
        toast({ title: "Subscribed successfully!" });
      },
      onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message })
    });
  }

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#FAFAFA]">
      {/* Background Shapes */}
      <img src="/shapes/Ellipse 1.svg" className="absolute top-0 right-0 -z-10 opacity-50" alt="" />
      <img src="/shapes/Subtract.svg" className="absolute bottom-0 left-0 -z-10 opacity-30" alt="" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="h-8 w-auto" />
            <span className="font-display font-bold text-2xl tracking-tight text-[#1A1A1A]">RealEstatePro</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('projects')} className="text-sm font-semibold text-[#4A4A4A] hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('clients')} className="text-sm font-semibold text-[#4A4A4A] hover:text-primary transition-colors">Clients</button>
            <Button onClick={() => scrollToSection('contact')} variant="default" size="lg" className="font-bold rounded-xl px-8 bg-[#1A1A1A] hover:bg-[#333]">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="lg:w-1/2 text-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-[#1A1A1A]">
                Find Your <span className="text-primary italic">Dream Home</span> With Expert Guidance
              </h1>
              <p className="text-xl text-[#4A4A4A] max-w-xl mb-12 leading-relaxed font-medium">
                Our team of dedicated professionals helps you navigate the complex real estate market with confidence and ease.
              </p>
              <Button onClick={() => scrollToSection('contact')} size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-[#1A1A1A] hover:bg-[#333] shadow-xl transition-all hover:scale-105">
                Book a Consultation <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
            <motion.div className="lg:w-1/2 relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src="/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg" alt="Real Estate" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-[#1A1A1A]">Our Projects</h2>
            <p className="text-lg text-[#4A4A4A] font-medium leading-relaxed">Explore our latest high-quality developments across the city.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((p) => (
              <Card key={p.id} className="border-none shadow-2xl overflow-hidden rounded-[40px] group hover:-translate-y-2 transition-all duration-500">
                <div className="h-64 overflow-hidden"><img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} /></div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4">{p.name}</h3>
                  <p className="text-[#4A4A4A] font-medium mb-6 line-clamp-3">{p.description}</p>
                  <Button variant="outline" className="w-full rounded-xl border-gray-200 font-bold">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-32 bg-[#F8F9FF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-20 text-[#1A1A1A]">Happy Clients</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {clients.map((c) => (
              <Card key={c.id} className="border-none shadow-xl rounded-[40px] p-8 text-center bg-white">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg">
                  <img src={c.imageUrl} className="w-full h-full object-cover" alt={c.name} />
                </div>
                <p className="italic text-[#4A4A4A] mb-8 font-medium">"{c.description}"</p>
                <h4 className="text-xl font-black text-[#1A1A1A]">{c.name}</h4>
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{c.designation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-[#1A1A1A] rounded-[60px] p-8 lg:p-20 shadow-2xl relative overflow-hidden text-white">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-2/5">
                <h2 className="text-4xl font-black mb-8">Get In Touch</h2>
                <p className="text-lg text-gray-400 mb-12 font-medium">Fill out the form and our team will reach out to you within one business day.</p>
              </div>
              <div className="lg:w-3/5 bg-white rounded-[40px] p-8 lg:p-12 text-[#1A1A1A]">
                <Form {...form}>
                  <form id="contact-form" onSubmit={form.handleSubmit(onLeadSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold">Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="h-14 rounded-2xl bg-gray-50 border-none" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold">Email</FormLabel><FormControl><Input placeholder="john@example.com" className="h-14 rounded-2xl bg-gray-50 border-none" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold">Mobile</FormLabel><FormControl><Input placeholder="+1 (555) 000-0000" className="h-14 rounded-2xl bg-gray-50 border-none" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold">City</FormLabel><FormControl><Input placeholder="New York" className="h-14 rounded-2xl bg-gray-50 border-none" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" className="w-full h-16 text-lg font-bold rounded-2xl bg-[#1A1A1A] hover:bg-[#333]" disabled={createLead.isPending}>
                      {createLead.isPending ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <Mail className="w-16 h-16 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Subscribe to our newsletter</h2>
          <p className="text-xl mb-12 font-medium opacity-80">Get the latest property updates and market trends directly in your inbox.</p>
          <Form {...subForm}>
            <form id="newsletter-form" onSubmit={subForm.handleSubmit(onSubSubmit)} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
              <FormField control={subForm.control} name="email" render={({ field }) => (
                <FormItem className="flex-1"><FormControl><Input placeholder="Your email address" className="h-16 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/50" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" variant="secondary" className="h-16 px-10 text-lg font-bold rounded-2xl hover:scale-105 transition-transform" disabled={createSubscription.isPending}>Subscribe</Button>
            </form>
          </Form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t text-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3"><img src="/images/logo.svg" className="h-8" alt="" /><span className="font-display font-bold text-2xl tracking-tight">RealEstatePro</span></div>
          <p className="text-sm font-bold text-gray-400">© 2024 RealEstatePro. All rights reserved.</p>
          <div className="flex gap-4"><a href="/admin" className="text-sm font-bold text-gray-400 hover:text-primary">Admin Access</a></div>
        </div>
      </footer>
    </div>
  );
}
