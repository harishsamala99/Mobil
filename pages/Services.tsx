import React from 'react';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  key?: React.Key;
}

const ServiceCard = ({ service }: ServiceCardProps) => (
  <div className="bg-secondary/30 dark:bg-secondary rounded-lg shadow-lg overflow-hidden flex flex-col group">
    <div className="overflow-hidden">
      <img src={service.image} alt={service.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-accent/10 rounded-full mr-4">
            <service.icon className="w-6 h-6 text-accent"/>
        </div>
        <h3 className="text-xl font-bold">{service.title}</h3>
      </div>
      <p className="text-secondary/80 dark:text-light/60 flex-grow">{service.description}</p>
    </div>
  </div>
);


const Services = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">Our Services</h1>
        <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
          Everything you need to keep you and your vehicle going.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;