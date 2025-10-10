import type { NavLink, FuelPrice, Product, Employee, Service } from './types';
import { Fuel, ShoppingBag, Car, AirPump, Atm } from './components/Icons';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/prices', label: 'Fuel Prices' },
  { href: '/services', label: 'Services' },
  { href: '/locator', label: 'Find a Station' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export const FUEL_PRICES: FuelPrice[] = [
  { id: 'regular', name: 'Regular (87)', price: 3.89, icon: Fuel },
  { id: 'super', name: 'Super (89)', price: 4.29, icon: Fuel },
  { id: 'premium', name: 'Premium (93)', price: 4.59, icon: Fuel },
  { id: 'diesel', name: 'Diesel', price: 4.25, icon: Fuel },
];

export const PRODUCTS_DATA: Product[] = [
    { id: '1', name: 'Chips', category: 'Snacks', stock: 'In Stock', icon: ShoppingBag },
    { id: '2', name: 'Soda', category: 'Drinks', stock: 'In Stock', icon: ShoppingBag },
    { id: '3', name: 'Sandwich', category: 'Food', stock: 'In Stock', icon: ShoppingBag },
    { id: '4', name: 'Coffee', category: 'Drinks', stock: 'In Stock', icon: ShoppingBag },
    { id: '5', name: 'Firewood', category: 'Supplies', stock: 'In Stock', icon: ShoppingBag },
    { id: '6', name: 'Engine Oil', category: 'Car Supplies', stock: 'In Stock', icon: Car },
    { id: '7', name: 'Candy Bar', category: 'Snacks', stock: 'In Stock', icon: ShoppingBag },
    { id: '8', name: 'Water Bottle', category: 'Drinks', stock: 'In Stock', icon: ShoppingBag },
];

export const EMPLOYEES_DATA: Employee[] = [
    { id: '1', name: 'ANGEL', role: 'Manager', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=johndoe` },
    { id: '2', name: 'LAHCEN', role: 'Cashier', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=janesmith` },
    { id: '3', name: 'HARISH', role: 'Cashier', shift: 'DAY & NIGHT', avatar: `https://i.pravatar.cc/150?u=mikejohnson` },
    { id: '4', name: 'GEIDY', role: 'Cashier', shift: 'DAY', avatar: `https://i.pravatar.cc/150?u=emilywilliams` },
    { id: '1', name: 'PHIL', role: 'Cashier', shift: 'NIGHT', avatar: `https://i.pravatar.cc/150?u=johndoe` },
    { id: '1', name: 'JOSELINE', role: 'Cashier', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=johndoe` },
    { id: '1', name: 'MARIA', role: 'Cashier', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=johndoe` },
    { id: '1', name: 'SUBRATA', role: 'Cashier', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=johndoe` },
];


// FIX: Add SERVICES_DATA to provide data for the services page.
export const SERVICES_DATA: Service[] = [
  {
    id: 'convenience-store',
    title: '24/7 Convenience Store',
    description: 'Stocked with all your road trip essentials, from snacks and drinks to coffee and car supplies.',
    image: 'https://res.cloudinary.com/disrdtslz/image/upload/v1760110811/gas1_ewwpvi.jpg',
    icon: ShoppingBag,
  },
  {
    id: 'air-vacuum',
    title: 'Tire Air & Vacuum',
    description: 'Free air for your tires and powerful vacuums to keep the inside of your car clean.',
    image: 'https://placehold.co/600x400/1B263B/E0E1DD?text=Tire+Air',
    icon: AirPump,
  },
  {
    id: 'atm',
    title: 'ATM Services',
    description: 'Need cash? We have an ATM available 24/7 for your convenience.',
    image: 'https://placehold.co/600x400/1B263B/E0E1DD?text=ATM',
    icon: Atm,
  },
];