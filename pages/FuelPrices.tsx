import React from 'react';
import { useFuelStore } from '../store/useFuelStore';
import type { FuelPrice } from '../types';

interface FuelPriceCardProps {
  item: FuelPrice;
  key?: React.Key;
}

const FuelPriceCard = ({ item }: FuelPriceCardProps) => (
    <div className="bg-secondary/50 dark:bg-secondary rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-secondary/20 hover:border-accent/50 transform hover:scale-105 transition-all duration-300 group">
        <div className="bg-accent/10 p-4 rounded-full mb-4 transition-all group-hover:animate-glow">
            <item.icon className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-secondary dark:text-white">{item.name}</h3>
        <p className="font-heading text-6xl font-bold text-accent my-3">${item.price.toFixed(2)}<span className="font-sans text-xl text-secondary/70 dark:text-light/50">/gal</span></p>
    </div>
);


const FuelPrices = () => {
  const fuelPrices = useFuelStore((state) => state.fuelPrices);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">Today's Fuel Prices</h1>
        <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
          Competitive and up-to-date pricing for quality MOBIL fuel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {fuelPrices.map((item) => (
          <FuelPriceCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-16 bg-secondary/50 dark:bg-secondary border-l-4 border-accent p-8 rounded-lg text-center max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl font-bold mb-4 text-secondary dark:text-light">Mobil Rewards+™</h2>
        <p className="text-secondary/80 dark:text-light/60 mb-6">
            Save on every gallon, earn points, and get exclusive rewards. Sign up today and start saving!
        </p>
        <button className="px-8 py-3 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-colors text-lg">
            Learn More
        </button>
      </div>
    </div>
  );
};

export default FuelPrices;