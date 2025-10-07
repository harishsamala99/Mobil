import type { NavLink, FuelPrice, Product, Employee, Service } from './types';
import { Fuel, ShoppingBag, Car, EvCharger } from './components/Icons';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/prices', label: 'Fuel Prices' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export const FUEL_PRICES: FuelPrice[] = [
  { id: 'regular', name: 'Regular (87)', price: 3.19, icon: Fuel, lastUpdated: '2 hours ago' },
  { id: 'premium', name: 'Premium (93)', price: 4.09, icon: Fuel, lastUpdated: '2 hours ago' },
  { id: 'diesel', name: 'Diesel', price: 4.05, icon: Fuel, lastUpdated: '1 hour ago' },
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
    { id: '1', name: 'JANGEL', role: 'MANAGER', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=johndoe` },
    { id: '2', name: 'LAHCEN', role: 'SUPERVISOR', shift: 'Day', avatar: `https://i.pravatar.cc/150?u=janesmith` },
    { id: '3', name: 'HARISH', role: 'CASHEIR', shift: 'Night', avatar: `https://i.pravatar.cc/150?u=mikejohnson` },
    { id: '4', name: 'GEIDY', role: 'CASHIER', shift: 'Night', avatar: `https://i.pravatar.cc/150?u=emilywilliams` },
];

// FIX: Add SERVICES_DATA to provide data for the services page.
export const SERVICES_DATA: Service[] = [
  
  //"./picture/pic1.jpg"
  {
    id: 'convenience-store',
    title: '24/7 Convenience Store',
    description: 'Stocked with all your road trip essentials, from snacks and drinks to coffee and car supplies.',
    image: 'https://images.unsplash.com/photo-1582555193132-888960714b35?q=80&w=2070&auto=format&fit=crop',
    icon: ShoppingBag,
  },
 
];
