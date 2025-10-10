import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from '../components/Icons';

// FIX: Add TypeScript definitions for Google Maps API to resolve compilation errors.
declare global {
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: HTMLElement, opts?: any);
        fitBounds(bounds: any): void;
        panTo(latLng: any): void;
        setCenter(latLng: any): void;
        setZoom(zoom: number): void;
      }
      class Marker {
        constructor(opts?: any);
        addListener(eventName: string, handler: () => void): any;
        getPosition(): any;
        setMap(map: Map | null): void;
        setAnimation(animation: any | null): void;
      }
      class DirectionsRenderer {
        constructor(opts?: any);
        setDirections(directions: any): void;
      }
      class DirectionsService {
        constructor();
        route(request: any, callback: (result: any, status: string) => void): void;
      }
      class LatLng {
        constructor(lat: number, lng: number);
      }
      class LatLngBounds {
        constructor(sw?: any, ne?: any);
        extend(point: any): void;
      }
      const Animation: {
        BOUNCE: any;
      };
      const TravelMode: {
        DRIVING: string;
      };
    }
  }

  interface Window {
    google?: typeof google;
  }
}

// Define a simple type for a station, now with coordinates
interface Station {
  id: string;
  name: string;
  address: string;
  zip: string;
  status: string;
  lat: number;
  lng: number;
}

// Mock data for stations with coordinates for Norwalk, CT area
const ALL_STATIONS: Station[] = [
    { id: '1', name: 'MOBIL - East Norwalk', address: '219 East Ave, East Norwalk, CT 06855', zip: '06855', status: 'Open 24 Hours', lat: 41.1177, lng: -73.4082 },
    { id: '2', name: 'MOBIL - I-95 North', address: 'Exit 16 I-95, Norwalk, CT 06854', zip: '06854', status: 'Open 24 Hours', lat: 41.10, lng: -73.41 },
    { id: '3', name: 'MOBIL - Rowayton', address: '123 Rowayton Ave, Norwalk, CT 06853', zip: '06853', status: 'Closes 11 PM', lat: 41.08, lng: -73.43 },
    { id: '4', name: 'MOBIL - Westside', address: '789 West St, Sometown, CT 06855', zip: '06855', status: 'Open 24 Hours', lat: 41.12, lng: -73.42 },
];

const USER_LOCATION = { lat: 41.105, lng: -73.425, name: 'Your Location' };

interface StationCardProps {
  station: Station;
  isSelected: boolean;
  onSelect: () => void;
  key?: React.Key;
}

const StationCard = ({ station, isSelected, onSelect }: StationCardProps) => (
    <button 
        onClick={onSelect}
        className={`w-full bg-secondary/30 dark:bg-secondary p-4 rounded-lg shadow-md transition-all duration-300 flex items-start space-x-4 text-left border-2 ${isSelected ? 'border-accent' : 'border-transparent hover:border-accent/50'}`}
    >
        <MapPin className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
        <div>
            <h3 className="font-bold text-secondary dark:text-light">{station.name}</h3>
            <p className="text-sm text-secondary/80 dark:text-light/60">{station.address}</p>
            <p className={`text-sm font-semibold ${station.status.includes('Open') ? 'text-green-500' : 'text-amber-500'}`}>{station.status}</p>
        </div>
    </button>
);


const StationLocator = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);


  // Initialize Map
  useEffect(() => {
    const initMap = () => {
      if (window.google && window.google.maps && mapRef.current && !mapInstance.current) {
        setMapError(null);
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 41.1177, lng: -73.4082 }, // Center on Norwalk
          zoom: 12,
          mapId: 'MOBIL_GAS_STATION_MAP',
          disableDefaultUI: true,
          zoomControl: true,
        });

        directionsService.current = new window.google.maps.DirectionsService();
        directionsRenderer.current = new window.google.maps.DirectionsRenderer({
          map: mapInstance.current,
          polylineOptions: {
            strokeColor: '#E21D38',
            strokeWeight: 5,
          }
        });
      } else if (!window.google || !window.google.maps) {
          setMapError("Google Maps failed to load. This is often due to an invalid API key. Please check the browser console for an 'InvalidKeyMapError' and ensure you have replaced 'YOUR_GOOGLE_MAPS_API_KEY_HERE' in index.html with a valid key.");
      }
    };
    
    // The Google Maps script is loaded with 'defer', so it might not be ready immediately.
    // We check for it, and if not present, we wait a moment and check again.
    if (window.google && window.google.maps) {
        initMap();
    } else {
        const timeoutId = setTimeout(initMap, 500); // Wait for script to potentially load
        return () => clearTimeout(timeoutId);
    }
  }, []);

  // Update markers when results change
  useEffect(() => {
    if (!mapInstance.current || !window.google) return;
    
    // Clear previous markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];
    
    // Clear previous directions
    directionsRenderer.current?.setDirections({ routes: [] });

    if (results.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      results.forEach(station => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: mapInstance.current,
          title: station.name,
        });
        marker.addListener('click', () => {
          setSelectedStationId(station.id);
          mapInstance.current?.panTo(marker.getPosition()!);
        });
        markers.current.push(marker);
        bounds.extend(marker.getPosition()!);
      });
      mapInstance.current.fitBounds(bounds);
    } else {
        // Reset view if no results
        mapInstance.current.setCenter({ lat: 41.1177, lng: -73.4082 });
        mapInstance.current.setZoom(12);
    }
  }, [results]);

  // Handle station selection (highlighting and directions)
  useEffect(() => {
    if (!mapInstance.current || !directionsService.current || !directionsRenderer.current || !window.google) return;
    
    const selectedStation = results.find(s => s.id === selectedStationId);

    // Update marker appearance
    markers.current.forEach(marker => {
      const stationPosition = marker.getPosition();
      const station = results.find(s => s.lat === stationPosition?.lat() && s.lng === stationPosition?.lng());
      const isSelected = station?.id === selectedStationId;
      marker.setAnimation(isSelected ? window.google.maps.Animation.BOUNCE : null);
    });

    if (selectedStation) {
      directionsService.current.route({
        origin: new window.google.maps.LatLng(USER_LOCATION.lat, USER_LOCATION.lng),
        destination: new window.google.maps.LatLng(selectedStation.lat, selectedStation.lng),
        travelMode: window.google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === 'OK' && directionsRenderer.current) {
          directionsRenderer.current.setDirections(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    } else {
      directionsRenderer.current.setDirections({ routes: [] });
      if (markers.current.length > 0) {
        // refit bounds if a station is deselected
        const bounds = new window.google.maps.LatLngBounds();
        markers.current.forEach(marker => bounds.extend(marker.getPosition()!));
        mapInstance.current.fitBounds(bounds);
      }
    }
  }, [selectedStationId, results]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      setSelectedStationId(null);
      if (!query.trim()) {
          setResults([]);
          setHasSearched(false);
          return;
      }
      setIsLoading(true);
      setHasSearched(true);
      setTimeout(() => {
          const lowerCaseQuery = query.toLowerCase();
          const isZipCodeSearch = /^\d{5}$/.test(query);
          const filteredStations = ALL_STATIONS.filter((station) => {
            if (station.address.toLowerCase().includes(lowerCaseQuery) || station.zip.includes(lowerCaseQuery)) return true;
            if (isZipCodeSearch && station.zip.startsWith(query.substring(0, 3))) return true;
            return false;
          });
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

      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column: Search and Results */}
        <div className="mb-8 lg:mb-0">
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

          {/* Results List */}
          <div className="space-y-4 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2">
              {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                      <p className="ml-4 text-lg">Searching...</p>
                  </div>
              ) : hasSearched ? (
                  <>
                      <h2 className="text-2xl font-bold">
                          Search Results {results.length > 0 && `(${results.length})`}
                      </h2>
                      {results.length > 0 && (
                        <p className="mb-4 text-sm text-secondary/80 dark:text-light/60">
                            {selectedStationId ? `Showing directions from Your Location.` : 'Select a station to see directions.'}
                        </p>
                      )}
                      {results.length === 0 ? (
                          <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-md text-center">
                              <p className="text-secondary/80 dark:text-light/60">No stations found for "{query}". Try a different location.</p>
                          </div>
                      ) : (
                          results.map((station) => (
                              <StationCard 
                                key={station.id} 
                                station={station}
                                isSelected={selectedStationId === station.id}
                                onSelect={() => setSelectedStationId(station.id)}
                              />
                          ))
                      )}
                  </>
              ) : (
                  <div className="bg-secondary/30 dark:bg-secondary p-8 rounded-lg shadow-md text-center">
                      <p className="text-secondary/80 dark:text-light/60">Enter a location above to find nearby stations.</p>
                  </div>
              )}
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="lg:sticky top-24 h-96 lg:h-[70vh] bg-secondary rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
            {mapError ? (
                <div className="p-8 text-center text-light">
                    <h3 className="text-2xl font-bold text-accent mb-4">Map Unavailable</h3>
                    <p className="text-light/80">{mapError}</p>
                </div>
            ) : (
                <div ref={mapRef} className="w-full h-full" />
            )}
        </div>
      </div>
    </div>
  );
};

export default StationLocator;