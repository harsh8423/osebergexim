import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Home, Factory, Wrench, Hammer, Shield } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Commercial Construction',
    description: 'Complete commercial building solutions from offices to retail spaces.',
    features: ['Office Buildings', 'Retail Centers', 'Warehouses']
  },
  {
    icon: Home,
    title: 'Residential Projects',
    description: 'Custom homes and residential developments built to last.',
    features: ['Custom Homes', 'Renovations', 'Housing Developments']
  },
  {
    icon: Factory,
    title: 'Industrial Construction',
    description: 'Specialized industrial facilities and manufacturing plants.',
    features: ['Manufacturing Plants', 'Distribution Centers', 'Industrial Parks']
  },
  {
    icon: Wrench,
    title: 'Infrastructure',
    description: 'Critical infrastructure projects including roads and utilities.',
    features: ['Road Construction', 'Utilities', 'Bridge Work']
  },
  {
    icon: Hammer,
    title: 'Renovation & Remodeling',
    description: 'Transform existing spaces with our renovation expertise.',
    features: ['Interior Renovation', 'Exterior Updates', 'Space Optimization']
  },
  {
    icon: Shield,
    title: 'Project Management',
    description: 'End-to-end project management ensuring quality and timelines.',
    features: ['Planning & Design', 'Quality Control', 'Timeline Management']
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Construction Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From residential to commercial projects, we provide comprehensive construction 
            services with unmatched quality and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform-3d hover:-translate-y-2 bg-card border-border"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
