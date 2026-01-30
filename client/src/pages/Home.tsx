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
  Rocket, 
  BarChart3, 
  Globe2, 
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
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">GrowthFlow</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</button>
            <Button onClick={() => scrollToSection('contact')} variant="default" size="sm" className="font-semibold">
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
          <div className="md:hidden border-t bg-background p-4 space-y-4 shadow-lg absolute w-full">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-sm font-medium">Features</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-sm font-medium">About</button>
            <Button onClick={() => scrollToSection('contact')} className="w-full">Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now Available in Beta
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Grow Your Business <br />
              <span className="text-gradient">Faster Than Ever</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Unlock powerful analytics, automation, and scaling tools designed to take your enterprise to the next level without the complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => scrollToSection('contact')} size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => scrollToSection('features')} variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-muted-foreground text-lg">Powerful features wrapped in a simple, intuitive interface that your team will actually want to use.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 className="w-10 h-10 text-primary" />}
              title="Advanced Analytics"
              description="Get deep insights into your business performance with real-time data visualization and custom reporting."
            />
            <FeatureCard 
              icon={<Globe2 className="w-10 h-10 text-accent" />}
              title="Global Scale"
              description="Deploy your infrastructure worldwide with a single click. Low latency, high availability guaranteed."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-10 h-10 text-indigo-500" />}
              title="Smart Automation"
              description="Automate repetitive tasks and workflows so your team can focus on what really matters—growth."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 blur-2xl"></div>
                {/* stock photo: modern office team meeting collaboration */}
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaborating" 
                  className="relative rounded-2xl shadow-2xl w-full border border-border"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Built for ambitious teams</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We started GrowthFlow because we were tired of complex, clunky enterprise software. We believe that powerful tools should feel simple and intuitive.
              </p>
              <ul className="space-y-4">
                {[
                  "Enterprise-grade security by default",
                  "24/7 dedicated support team",
                  "99.99% uptime SLA guarantee",
                  "Seamless integration with your stack"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <Card className="shadow-xl border-border/50">
              <CardHeader className="text-center space-y-2 pb-8">
                <CardTitle className="text-3xl">Get in touch</CardTitle>
                <CardDescription className="text-lg">
                  Ready to start? Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@company.com" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project needs..." 
                              className="min-h-[120px] resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">GrowthFlow</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 GrowthFlow Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="pt-8 px-6 pb-8 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-secondary mb-6 ring-1 ring-border">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
