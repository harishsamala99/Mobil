import React, { useState, useEffect } from 'react';
import { useFuelStore } from '../store/useFuelStore';
import { useInventoryStore } from '../store/useInventoryStore';
import { useEmployeeStore } from '../store/useEmployeeStore';
import type { FuelPrice, Product, Employee } from '../types';

const AdminLogin = ({ onLogin }) => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-lg">
            <h2 className="text-center font-heading text-3xl font-bold text-secondary dark:text-white uppercase mb-6">Admin Access</h2>
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-secondary/90 dark:text-light/70">Username</label>
                    <input type="text" id="username" defaultValue="admin" className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-secondary/90 dark:text-light/70">Password</label>
                    <input type="password" id="password" defaultValue="password" className="mt-1 block w-full px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-colors">
                    Login
                </button>
            </form>
        </div>
    </div>
);

const FuelPriceManager = () => {
  const { fuelPrices, updatePrice } = useFuelStore();
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initialPrices = fuelPrices.reduce((acc, fuel) => {
      acc[fuel.id] = fuel.price.toFixed(2);
      return acc;
    }, {} as Record<string, string>);
    setPrices(initialPrices);
  }, [fuelPrices]);

  const handlePriceChange = (id: string, value: string) => {
    setIsSaved(false);
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setPrices({ ...prices, [id]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(prices).forEach(([id, priceStr]) => {
      const newPrice = parseFloat(priceStr);
      if (!isNaN(newPrice)) {
        updatePrice(id, newPrice);
      }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {fuelPrices.map((fuel) => (
            <div key={fuel.id} className="flex flex-col sm:flex-row items-center justify-between">
            <label htmlFor={fuel.id} className="text-lg font-medium text-secondary/90 dark:text-light/80 mb-2 sm:mb-0">
                {fuel.name}
            </label>
            <div className="flex items-center space-x-2">
                <span className="text-secondary/70 dark:text-light/50 text-lg">$</span>
                <input
                type="text"
                id={fuel.id}
                value={prices[fuel.id] || ''}
                onChange={(e) => handlePriceChange(fuel.id, e.target.value)}
                className="w-32 px-4 py-2 text-lg text-right rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            </div>
        ))}
        <div className="pt-4">
            <button type="submit" className="w-full px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-colors">
            Save Fuel Prices
            </button>
            {isSaved && <p className="text-center text-green-500 mt-4">Prices updated successfully!</p>}
        </div>
    </form>
  )
}

const InventoryManager = () => {
    const { products, updateStock } = useInventoryStore();
    return (
        <div className="space-y-4">
            {products.map(product => (
                <div key={product.id} className="flex flex-col sm:flex-row items-center justify-between p-3 bg-primary/20 rounded-md">
                     <span className="text-lg font-medium text-secondary/90 dark:text-light/80 mb-2 sm:mb-0">{product.name}</span>
                     <select 
                        value={product.stock} 
                        onChange={(e) => updateStock(product.id, e.target.value as Product['stock'])}
                        className="px-4 py-2 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                         <option value="In Stock">In Stock</option>
                         <option value="Low Stock">Low Stock</option>
                         <option value="Out of Stock">Out of Stock</option>
                     </select>
                </div>
            ))}
        </div>
    )
}

const EmployeeManager = () => {
    const { employees, addEmployee, updateEmployee, removeEmployee } = useEmployeeStore();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [shift, setShift] = useState('Day');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if(name && role) {
            addEmployee({ name, role, shift });
            setName('');
            setRole('');
            setShift('Day');
        }
    }
    
    return (
        <div className="space-y-6">
            <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end p-4 bg-primary/20 rounded-md">
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-4 py-2 rounded-md bg-light dark:bg-primary border-secondary/20 dark:border-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full px-4 py-2 rounded-md bg-light dark:bg-primary border-secondary/20 dark:border-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                 </div>
                 <button type="submit" className="px-4 py-2 bg-accent text-white font-bold rounded-md hover:bg-accent/80">Add Employee</button>
            </form>
            <div className="space-y-2">
                {employees.map(emp => (
                    <div key={emp.id} className="flex items-center justify-between p-3 bg-primary/20 rounded-md">
                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full"/>
                        <p>{emp.name}</p>
                        <p>{emp.role}</p>
                        <button onClick={() => removeEmployee(emp.id)} className="px-3 py-1 bg-red-800/80 text-white text-sm rounded-md hover:bg-red-800">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Analytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div className="bg-primary/20 p-6 rounded-md">
            <h3 className="font-heading text-xl text-accent">Fuel Sales (Today)</h3>
            <p className="text-4xl font-bold mt-2">1,204 <span className="text-lg font-normal">Gallons</span></p>
        </div>
        <div className="bg-primary/20 p-6 rounded-md">
            <h3 className="font-heading text-xl text-accent">Store Sales (Today)</h3>
            <p className="text-4xl font-bold mt-2">$2,345.67</p>
        </div>
         <div className="bg-primary/20 p-6 rounded-md md:col-span-2">
            <h3 className="font-heading text-xl text-accent">Visitors (Today)</h3>
            <p className="text-4xl font-bold mt-2">452</p>
        </div>
    </div>
);


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('fuel');
    const tabs = {
        fuel: { label: 'Fuel Prices', component: <FuelPriceManager/> },
        inventory: { label: 'Inventory', component: <InventoryManager/> },
        employees: { label: 'Employees', component: <EmployeeManager/> },
        analytics: { label: 'Analytics', component: <Analytics/> },
    };
    const ActiveComponent = tabs[activeTab].component;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 border-b border-secondary/50 flex space-x-2 sm:space-x-4">
                {Object.entries(tabs).map(([key, {label}]) => (
                    <button 
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-3 sm:px-6 py-3 font-bold text-sm sm:text-base transition-colors duration-300 relative ${activeTab === key ? 'text-accent' : 'text-secondary/70 dark:text-light/60 hover:text-accent'}`}
                    >
                        {label}
                        {activeTab === key && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-lg"></div>}
                    </button>
                ))}
            </div>
            <div className="bg-secondary/30 dark:bg-secondary p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{tabs[activeTab].label}</h2>
                {ActiveComponent}
            </div>
        </div>
    )
}


const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-light dark:bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">Admin Dashboard</h1>
            <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
              Station Management Control Center
            </p>
          </div>
          {isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />}
      </div>
    </div>
  );
};

export default Admin;
