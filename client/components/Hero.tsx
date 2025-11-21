import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Building2, Users, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-background to-muted pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Building Tomorrow's
                <span className="text-primary block">Infrastructure</span>
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                Where Quality Meets Home
              </p>
              <p className="text-lg text-muted-foreground max-w-lg">
                Professional construction services with over 20 years of experience. 
                At Crafted Edge Construction, we deliver quality projects on time and within budget.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="shadow-lg">
                View Portfolio
              </Button>
            </div>


          </div>

          {/* Right Content - 3D Elements */}
          <div className="relative perspective">
            <div className="relative transform-3d">
              {/* Main Building Image */}
              <div className="bg-card rounded-2xl p-6 shadow-2xl border border-border rotate-x-6 hover:rotate-x-3 transition-transform duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1590725175207-8d9d04e7b7d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern construction site"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Modern Commercial Complex</h3>
                  <p className="text-sm text-muted-foreground">Completed 2024</p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-lg border border-border transform-3d rotate-y-6 hover:rotate-y-3 transition-transform duration-500">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <div className="text-sm font-semibold">Commercial</div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border transform-3d rotate-y-6 hover:rotate-y-3 transition-transform duration-500">
                <Award className="h-8 w-8 text-primary mb-2" />
                <div className="text-sm font-semibold">Award Winner</div>
              </div>

              <div className="absolute top-16 -right-8 bg-card p-4 rounded-xl shadow-lg border border-border transform-3d rotate-x-6 hover:rotate-x-3 transition-transform duration-500">
                <Users className="h-8 w-8 text-primary mb-2" />
                <div className="text-sm font-semibold">Expert Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
