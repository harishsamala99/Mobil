import { create } from 'zustand';
import { FUEL_PRICES as initialFuelPrices } from '../constants';
import type { FuelPrice } from '../types';

type FuelStoreState = {
  fuelPrices: FuelPrice[];
  updatePrice: (id: string, newPrice: number) => void;
};

export const useFuelStore = create<FuelStoreState>((set) => ({
  fuelPrices: initialFuelPrices,
  updatePrice: (id, newPrice) =>
    set((state) => ({
      fuelPrices: state.fuelPrices.map((fuel) =>
        fuel.id === id ? { ...fuel, price: newPrice, lastUpdated: 'Just now' } : fuel
      ),
    })),
}));
