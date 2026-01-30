import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Menu, 
  X,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const createLead = useCreateLead();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: InsertLead) {
    createLead.mutate(data, {
      onSuccess: () => form.reset(),
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
            <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-[#4A4A4A] hover:text-primary transition-colors">Features</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-semibold text-[#4A4A4A] hover:text-primary transition-colors">About</button>
            <Button onClick={() => scrollToSection('contact')} variant="default" size="lg" className="font-bold rounded-xl px-8 bg-[#1A1A1A] hover:bg-[#333]">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white p-6 space-y-6 shadow-2xl absolute w-full left-0">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-lg font-semibold">Features</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-lg font-semibold">About</button>
            <Button onClick={() => scrollToSection('contact')} className="w-full py-6 text-lg rounded-xl bg-[#1A1A1A]">Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-[#1A1A1A]">
                Find Your <span className="text-primary italic">Dream Home</span> With Expert Guidance
              </h1>
              
              <p className="text-xl text-[#4A4A4A] max-w-xl mb-12 leading-relaxed font-medium">
                Our team of dedicated professionals helps you navigate the complex real estate market with confidence and ease.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Button onClick={() => scrollToSection('contact')} size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-[#1A1A1A] hover:bg-[#333] shadow-xl transition-all hover:scale-105">
                  Book a Consultation <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`/images/Ellipse ${27+i}.svg`} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">1,200+ Happy Clients</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg" 
                  alt="Real Estate consultation" 
                  className="w-full h-auto"
                />
              </div>
              <img src="/shapes/Subtract-1.svg" className="absolute -bottom-10 -right-10 -z-10 w-48" alt="" />
              <div className="absolute top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4 z-20">
                <img src="/icons/home.svg" alt="" className="w-12 h-12" />
                <div>
                  <div className="text-2xl font-black text-[#1A1A1A]">500+</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Properties Sold</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <img src="/shapes/Ellipse 10.svg" className="absolute top-0 left-0 opacity-20" alt="" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-[#1A1A1A]">Our Premium Services</h2>
            <p className="text-lg text-[#4A4A4A] font-medium leading-relaxed">We provide end-to-end solutions for all your real estate needs, from property search to final closing.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon="/icons/home.svg"
              title="Property Search"
              description="Access exclusive listings and off-market properties tailored to your specific criteria."
              delay={0}
            />
            <FeatureCard 
              icon="/icons/circle-dollar-sign.svg"
              title="Financial Advice"
              description="Our experts help you secure the best mortgage rates and structure your investment wisely."
              delay={0.2}
            />
            <FeatureCard 
              icon="/icons/paintbrush-2.svg"
              title="Interior Design"
              description="Transform your new space with our professional interior design consultation services."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#F8F9FF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/pexels-brett-sayles-2881232.svg" className="rounded-3xl shadow-lg mt-12" alt="" />
                <img src="/images/pexels-andres-ayrton-6578391.svg" className="rounded-3xl shadow-lg" alt="" />
              </div>
              <img src="/shapes/Rectangle 54.svg" className="absolute -z-10 -top-10 -left-10 w-64" alt="" />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-4xl font-black mb-8 text-[#1A1A1A]">Why Choose RealEstatePro?</h2>
              <p className="text-xl text-[#4A4A4A] mb-10 leading-relaxed font-medium">
                With over a decade of experience, we have built a reputation for integrity, transparency, and results. We don't just sell houses; we build futures.
              </p>
              <div className="space-y-6">
                {[
                  "Licensed professionals with deep market knowledge",
                  "Personalized attention to every client's needs",
                  "Proven track record of successful negotiations",
                  "Comprehensive post-purchase support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <img src="/icons/home.svg" className="w-8 h-8" alt="" />
                    <span className="font-bold text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <img src="/shapes/Subtract-2.svg" className="absolute top-20 right-0 w-32" alt="" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto bg-[#1A1A1A] rounded-[60px] p-8 lg:p-20 shadow-2xl relative overflow-hidden">
            <img src="/shapes/Ellipse 19.svg" className="absolute top-0 right-0 opacity-10" alt="" />
            
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-2/5 text-white">
                <h2 className="text-4xl font-black mb-8">Ready to Take the Next Step?</h2>
                <p className="text-lg text-gray-400 mb-12 font-medium">Fill out the form and our team will reach out to you within one business day for a free consultation.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <img src="/icons/home.svg" className="w-7 h-7 invert" alt="" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Address</div>
                      <div className="text-lg font-bold">123 Reality St, Suite 100, NY</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <img src="/icons/Linkedin.svg" className="w-7 h-7" alt="" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Connect</div>
                      <div className="text-lg font-bold">@RealEstatePro_Official</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 bg-white rounded-[40px] p-8 lg:p-12 shadow-2xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-[#1A1A1A]">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-14 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-[#1A1A1A]">Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" className="h-14 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-[#1A1A1A]">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" className="h-14 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-[#1A1A1A]">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about what you're looking for..." 
                              className="min-h-[150px] rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-primary resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-16 text-lg font-bold rounded-2xl bg-[#1A1A1A] hover:bg-[#333] transition-all"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? "Sending..." : "Request Call Back"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/logo.svg" alt="Logo" className="h-8" />
                <span className="font-display font-bold text-2xl tracking-tight">RealEstatePro</span>
              </div>
              <p className="text-[#4A4A4A] font-medium leading-relaxed">
                Elevating the real estate experience through expertise, technology, and personalized service.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div>
                <h4 className="font-black text-[#1A1A1A] mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-500">
                  <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors text-left">Features</button>
                  <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors text-left">About Us</button>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors text-left">Contact</button>
                </div>
              </div>
              <div>
                <h4 className="font-black text-[#1A1A1A] mb-6 uppercase tracking-widest text-xs">Support</h4>
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-500">
                  <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-sm font-bold text-gray-400">
              © 2024 RealEstatePro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <img src="/icons/Linkedin.svg" className="w-5 h-5" alt="" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <img src="/icons/Frame.svg" className="w-5 h-5" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: string, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="border-none shadow-2xl hover:shadow-primary/5 transition-all duration-500 p-10 rounded-[40px] bg-white group hover:-translate-y-2">
        <CardContent className="p-0">
          <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
            <img src={icon} alt="" className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-[#1A1A1A]">{title}</h3>
          <p className="text-[#4A4A4A] leading-relaxed font-medium">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
