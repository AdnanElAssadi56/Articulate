'use client';

import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      category: "Career",
      text: "The career advisor helped me negotiate a 40% salary increase and land my dream job at a top tech company.",
      avatar: "💼",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Student",
      category: "Spiritual",
      text: "Learning Quran recitation with proper Tajweed has never been easier. The spiritual guidance is truly transformative.",
      avatar: "🕌",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Entrepreneur",
      category: "Wellness",
      text: "The wellness advisor helped me manage stress and build healthy habits. I feel more balanced and productive.",
      avatar: "🧠",
      rating: 5
    },
    {
      name: "Marcus Williams",
      role: "High School Student",
      category: "Academic",
      text: "My grades improved dramatically! The personalized tutoring approach made complex topics easy to understand.",
      avatar: "🎓",
      rating: 5
    }
  ];

  return (
    <section className="py-16 max-sm:py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See how Articulate is transforming lives across different domains
        </p>
      </div>

      <div className="relative">
        {/* Main testimonial */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-start gap-6 max-sm:flex-col">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl flex-shrink-0 shadow-lg">
              {testimonials[activeIndex].avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <span key={i} className="text-warning text-xl">★</span>
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-card-foreground mb-6 leading-relaxed">
                "{testimonials[activeIndex].text}"
              </p>
              
              <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
                <div>
                  <p className="font-bold text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-muted-foreground">{testimonials[activeIndex].role}</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm">
                  {testimonials[activeIndex].category} Advisor
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-12 h-3 bg-gradient-to-r from-primary to-accent' 
                  : 'w-3 h-3 bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail navigation */}
        <div className="grid grid-cols-4 gap-4 mt-8 max-sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                index === activeIndex
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card/50 hover:border-accent hover:shadow-sm'
              }`}
            >
              <div className="text-3xl mb-2">{testimonial.avatar}</div>
              <p className="font-semibold text-sm">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.category}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
