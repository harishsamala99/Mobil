import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useThemeStore } from '../store/useThemeStore';
import { Sun, Moon, Menu, X } from './Icons';
import { Logo } from './Logo';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-light/70 hover:text-light hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
    </button>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary/80 dark:bg-primary/80 backdrop-blur-md border-b border-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/">
            <Logo />
          </NavLink>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors uppercase tracking-wider ${
                    isActive
                      ? 'text-accent'
                      : 'text-light/70 hover:text-light'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent rounded-full"></span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-light/70 hover:text-light hover:bg-secondary/50"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-20 left-0 w-full bg-primary shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-light/80 hover:bg-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};