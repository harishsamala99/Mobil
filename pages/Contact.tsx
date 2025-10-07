import React from 'react';
import { MapPin, Phone, Mail, Clock } from '../components/Icons';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">Get in Touch</h1>
        <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
          We'd love to hear from you. Send us a message or stop by the station.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary/90 dark:text-light/70">Full Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary/90 dark:text-light/70">Email Address</label>
              <input type="email" id="email" className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary/90 dark:text-light/70">Subject</label>
              <input type="text" id="subject" className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary/90 dark:text-light/70">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-8">
            <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4 text-secondary/90 dark:text-light/80">
                    <div className="flex items-start">
                        <MapPin className="w-6 h-6 mr-4 text-accent flex-shrink-0 mt-1" />
                        <span><strong>Address:</strong><br/>219 East Ave, East Norwalk, CT 06855</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-6 h-6 mr-4 text-accent flex-shrink-0" />
                        <span><strong>Phone:</strong> (203) 555-0184</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="w-6 h-6 mr-4 text-accent flex-shrink-0" />
                        <span><strong>Email:</strong> contact@mobilnorwalk.com</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-4 text-accent flex-shrink-0" />
                        <span><strong>Hours:</strong> Open 24/7</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;