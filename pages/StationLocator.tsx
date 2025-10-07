import React, { useState } from 'react';
import { MapPin } from '../components/Icons';

// Define a simple type for a station
interface Station {
  id: string;
  name: string;
  address: string;
  zip: string;
  status: string;
}

// Mock data for stations
const ALL_STATIONS: Station[] = [
    { id: '1', name: 'MOBIL - East Norwalk', address: '219 East Ave, East Norwalk, CT 06855', zip: '06855', status: 'Open 24 Hours' },
    { id: '2', name: 'MOBIL - Highway 5 Express', address: '456 Expressway Rd, Motortown, USA 12345', zip: '12345', status: 'Open 24 Hours' },
    { id: '3', name: 'MOBIL - Downtown', address: '123 Main St, Anytown, USA 54321', zip: '54321', status: 'Closes 11 PM' },
    { id: '4', name: 'MOBIL - Westside', address: '789 West St, Sometown, CT 06855', zip: '06855', status: 'Open 24 Hours' },
];

const StationCard = ({ station }: { station: Station }) => (
    <div className="bg-secondary/30 dark:bg-secondary p-4 rounded-lg shadow-md transition-all duration-300 flex items-start space-x-4">
        <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
        <div>
            <h3 className="font-bold text-secondary dark:text-light">{station.name}</h3>
            <p className="text-sm text-secondary/80 dark:text-light/60">{station.address}</p>
            <p className={`text-sm font-semibold ${station.status.includes('Open') ? 'text-green-500' : 'text-amber-500'}`}>{station.status}</p>
        </div>
    </div>
);


const StationLocator = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) {
          setResults([]);
          setHasSearched(false);
          return;
      }

      setIsLoading(true);
      setHasSearched(true);

      // Simulate API call
      setTimeout(() => {
          const lowerCaseQuery = query.toLowerCase();
          const filteredStations = ALL_STATIONS.filter(
              (station) =>
                  station.address.toLowerCase().includes(lowerCaseQuery) ||
                  station.zip.includes(lowerCaseQuery)
          );
          setResults(filteredStations);
          setIsLoading(false);
      }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">Find a Station</h1>
        <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
          Find a MOBIL station near you for fuel, food, and more.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city, state, or zip code"
            className="flex-grow px-4 py-3 rounded-md border border-secondary/20 dark:border-primary bg-light dark:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-accent/80 transition-colors"
            aria-label="Search for stations"
          >
            Search
          </button>
        </form>
        
        <div className="bg-secondary rounded-lg shadow-lg overflow-hidden h-96 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1593348525656-c74b21613f34?q=80&w=1920&auto=format&fit=crop" 
            alt="Map showing station locations"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-8">
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    <p className="ml-4 text-lg">Searching...</p>
                </div>
            ) : hasSearched ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">
                        Search Results {results.length > 0 && `(${results.length})`}
                    </h2>
                    {results.length === 0 ? (
                        <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-md text-center">
                            <p className="text-secondary/80 dark:text-light/60">No stations found for "{query}". Try a different location.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {results.map((station) => (
                                <StationCard key={station.id} station={station} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-md text-center">
                    <p className="text-secondary/80 dark:text-light/60">Enter a location above to find nearby stations.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StationLocator;
