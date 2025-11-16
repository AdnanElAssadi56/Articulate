'use client';

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants/categories";
import { Textarea } from "@/components/ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from 'next/navigation'

// Zod Schema - Defines validation rules
const formSchema = z.object({
  name: z.string().min(1, { message: 'Advisor name is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  topic: z.string().min(1, { message: 'Topic is required.' }),
  voice: z.string().min(1, { message: 'Voice is required.' }),
  style: z.string().min(1, { message: 'Style is required.' }),
  duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Connect Zod validation
    defaultValues: {
      name: '',
      category: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 30, // Default 30 minutes
      description: '',
    },
  });

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const companion = await createCompanion(values);

      if(companion) {
          redirect(`/companions/${companion.id}`);
      } else {
          console.log('Failed to create a companion');
          redirect('/');
      }
    } catch (error) {
      console.error('Error creating companion:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Advisor Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advisor name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Dr. Sarah Chen"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Dropdown */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem value={cat.id} key={cat.id}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Specialty/Subject Input */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty Area</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Career Strategy, Meditation, Quran Recitation, Mathematics"
                  {...field}
                  className="input"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                What specific area does this advisor specialize in?
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Focus Area - What they help with */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Area</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Interview prep and salary negotiation"
                  {...field}
                  className="input"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                What specific topics or problems does this advisor address?
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description - Background/Bio */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advisor Background</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 15 years helping professionals navigate career transitions. Expert in tech careers and leadership development."
                  {...field}
                  className="input min-h-[100px]"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Brief bio, credentials, or experience that establishes credibility
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Voice Selection */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Style Selection */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual - Friendly and conversational</SelectItem>
                    <SelectItem value="professional">Professional - Clear and focused</SelectItem>
                    <SelectItem value="formal">Formal - Structured and respectful</SelectItem>
                    <SelectItem value="nurturing">Nurturing - Gentle and supportive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Input */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Creating Advisor...
            </span>
          ) : (
            'Create Advisor'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
