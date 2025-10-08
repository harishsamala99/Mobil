
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Facebook, Instagram, Twitter } from './Icons';

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary border-t border-secondary/20 dark:border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
             <NavLink to="/" className="flex items-center font-heading text-4xl font-bold text-light tracking-wider">
                <span>M<span className="text-accent">O</span>BIL</span>
             </NavLink>
            <p className="text-sm text-secondary/70 dark:text-light/50">
              Fuel Your Journey. Power Your Performance. <br/> Proudly serving Subway.
            </p>
             <div className="flex space-x-4">
                <a href="https://twitter.com/mobil" target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-accent transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="https://facebook.com/mobil" target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-accent transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="https://instagram.com/mobil" target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-accent transition-colors"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-secondary dark:text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.filter(l => l.href !== '/admin').map((link) => (
                <li key={link.href}>
                  <NavLink to={link.href} className="text-sm text-secondary/80 dark:text-light/60 hover:text-accent">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-secondary dark:text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary/80 dark:text-light/60">
              <li>219 East Ave, East Norwalk, CT 06855</li>
              <li>(203) 555-0184</li>
              <li>contact@mobilnorwalk.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-secondary dark:text-white tracking-wider uppercase">Scan to Visit</h3>
            <div className="mt-4 bg-white p-2 rounded-md inline-block shadow-md">
                <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${window.location.origin}`} 
                    alt="QR Code for the website"
                    className="w-28 h-28 md:w-32 md:h-32"
                />
            </div>
             <p className="mt-2 text-sm text-secondary/80 dark:text-light/60">Quick access on mobile.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary/20 dark:border-primary pt-8 text-center text-sm text-secondary/70 dark:text-light/50">
          <p>&copy; {new Date().getFullYear()} MOBIL Norwalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
