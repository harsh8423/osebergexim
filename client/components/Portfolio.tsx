import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

const projects = [
  {
    title: 'Downtown Office Complex',
    category: 'Commercial',
    location: 'New York, NY',
    year: '2024',
    value: '$15M',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Modern 20-story office building with sustainable design features and smart building technology.'
  },
  {
    title: 'Luxury Residential Tower',
    category: 'Residential',
    location: 'Miami, FL',
    year: '2023',
    value: '$25M',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'High-end residential tower with panoramic ocean views and premium amenities.'
  },
  {
    title: 'Manufacturing Facility',
    category: 'Industrial',
    location: 'Chicago, IL',
    year: '2023',
    value: '$12M',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'State-of-the-art manufacturing plant with automated systems and energy-efficient design.'
  },
  {
    title: 'Shopping Center Renovation',
    category: 'Retail',
    location: 'Los Angeles, CA',
    year: '2024',
    value: '$8M',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Complete renovation of existing shopping center with modern design and improved functionality.'
  },
  {
    title: 'Healthcare Campus',
    category: 'Healthcare',
    location: 'Boston, MA',
    year: '2023',
    value: '$30M',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Multi-building healthcare campus with advanced medical facilities and patient-centered design.'
  },
  {
    title: 'Educational Complex',
    category: 'Education',
    location: 'Austin, TX',
    year: '2024',
    value: '$18M',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Modern educational facility with flexible learning spaces and cutting-edge technology infrastructure.'
  }
];

export function Portfolio() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful construction projects across various sectors, 
            showcasing our expertise and commitment to quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform-3d hover:-translate-y-2 bg-card border-border"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Completed {project.year}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Project Value: {project.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
