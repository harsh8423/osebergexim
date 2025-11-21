import React from 'react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle } from 'lucide-react';

export function About() {


  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Excellence Since 2024
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Crafted Edge Construction has been at the forefront of construction innovation for over two decades. 
                Our commitment to quality, safety, and customer satisfaction has made us a trusted 
                partner for projects of all sizes - where quality truly meets home.
              </p>
              <p className="text-muted-foreground">
                We combine traditional craftsmanship with modern technology to deliver exceptional 
                results that stand the test of time. Our experienced team works closely with clients 
                to bring their vision to life while maintaining the highest standards of quality and safety.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                'Licensed and fully insured',
                'OSHA certified safety protocols',
                'Sustainable building practices',
                'Advanced project management systems'
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>


          </div>

          {/* Right Content - Images */}
          <div className="relative perspective">
            <div className="grid grid-cols-2 gap-4 transform-3d">
              <div className="space-y-4">
                <div className="bg-card rounded-xl overflow-hidden shadow-lg transform rotate-x-6 hover:rotate-x-3 transition-transform duration-500">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Construction team"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="bg-card rounded-xl overflow-hidden shadow-lg transform rotate-y-6 hover:rotate-y-3 transition-transform duration-500">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Modern building"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-xl overflow-hidden shadow-lg transform rotate-x-6 hover:rotate-x-3 transition-transform duration-500">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="City skyline"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="bg-card rounded-xl overflow-hidden shadow-lg transform rotate-y-6 hover:rotate-y-3 transition-transform duration-500">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Construction site"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
