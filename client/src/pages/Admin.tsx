import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { api } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, insertClientSchema, type Project, type Client, type Lead, type Subscription } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  
  // Fetch Data
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: [api.projects.list.path] });
  const { data: clients = [] } = useQuery<Client[]>({ queryKey: [api.clients.list.path] });
  const { data: leads = [] } = useQuery<Lead[]>({ queryKey: [api.leads.list.path] });
  const { data: subscriptions = [] } = useQuery<Subscription[]>({ queryKey: [api.subscriptions.list.path] });

  // Mutations
  const createProject = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.projects.create.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.projects.list.path] });
      toast({ title: "Project added successfully" });
    }
  });

  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      await fetch(api.projects.delete.path.replace(':id', String(id)), { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.projects.list.path] })
  });

  const createClient = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.clients.create.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.clients.list.path] });
      toast({ title: "Client added successfully" });
    }
  });

  const deleteClient = useMutation({
    mutationFn: async (id: number) => {
      await fetch(api.clients.delete.path.replace(':id', String(id)), { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.clients.list.path] })
  });

  // Forms
  const projectForm = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: { name: "", description: "", imageUrl: "" }
  });

  const clientForm = useForm({
    resolver: zodResolver(insertClientSchema),
    defaultValues: { name: "", description: "", designation: "", imageUrl: "" }
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>
      
      <Tabs defaultValue="projects">
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="leads">Contact Leads</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader><CardTitle>Add Project</CardTitle></CardHeader>
              <CardContent>
                <Form {...projectForm}>
                  <form onSubmit={projectForm.handleSubmit((data) => createProject.mutate(data))} className="space-y-4">
                    <FormField control={projectForm.control} name="name" render={({field}) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={projectForm.control} name="description" render={({field}) => (
                      <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={projectForm.control} name="imageUrl" render={({field}) => (
                      <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={createProject.isPending}>Add Project</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Image</TableHead><TableHead>Name</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell><img src={p.imageUrl} className="w-12 h-12 object-cover rounded" /></TableCell>
                      <TableCell className="font-bold">{p.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{p.description}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteProject.mutate(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader><CardTitle>Add Client</CardTitle></CardHeader>
              <CardContent>
                <Form {...clientForm}>
                  <form onSubmit={clientForm.handleSubmit((data) => createClient.mutate(data))} className="space-y-4">
                    <FormField control={clientForm.control} name="name" render={({field}) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={clientForm.control} name="designation" render={({field}) => (
                      <FormItem><FormLabel>Designation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={clientForm.control} name="description" render={({field}) => (
                      <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={clientForm.control} name="imageUrl" render={({field}) => (
                      <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={createClient.isPending}>Add Client</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Image</TableHead><TableHead>Name</TableHead><TableHead>Designation</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell><img src={c.imageUrl} className="w-12 h-12 object-cover rounded" /></TableCell>
                      <TableCell className="font-bold">{c.name}</TableCell>
                      <TableCell>{c.designation}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteClient.mutate(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Mobile</TableHead><TableHead>City</TableHead><TableHead>Date</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-bold">{l.name}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.phone}</TableCell>
                  <TableCell>{l.city}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Email</TableHead><TableHead>Subscribed Date</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-bold">{s.email}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
