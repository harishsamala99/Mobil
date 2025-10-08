import type React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface FuelPrice {
  id: string;
  name: string;
  price: number;
  icon: React.ElementType;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: 'In Stock' | 'Low Stock' | 'Out of Stock';
  icon: React.ElementType;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  shift: string;
  avatar: string;
}

// FIX: Add Service interface for the services page.
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}