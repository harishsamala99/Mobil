import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useInventoryStore } from '../store/useInventoryStore';
import { Fuel, ShoppingBag, Restroom, AirPump, Atm, Vacuum } from '../components/Icons';

const heroImages = [
    'https://res.cloudinary.com/disrdtslz/image/upload/v1760110011/station_ilrgfp.jpg',
    'https://res.cloudinary.com/disrdtslz/image/upload/v1760110811/gas1_ewwpvi.jpg',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 8000); // Change image every 8 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
            {heroImages.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt="Mobil gas station background"
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/50 to-transparent" aria-hidden="true"></div>
            <div className="relative z-10 text-center p-4">
                <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-wider uppercase mb-4" style={{textShadow: '0 2px 10px rgba(226, 29, 56, 0.5)'}}>
                    Fuel Your Journey.<br/> Power Your Performance.
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-light/80" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
                    Experience the pinnacle of fuel technology and track-side convenience.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NavLink to="/prices" className="px-8 py-4 bg-accent text-white font-bold rounded-md hover:bg-accent/90 transition-all text-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50">
                        Today's Fuel Prices
                    </NavLink>
                     <a href="https://rewards.exxon.com/welcome/login" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-secondary/80 text-white font-bold rounded-md hover:bg-secondary transition-all text-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-light/50">
                        Join Mobil Rewards+
                    </a>
                </div>
            </div>
        </section>
    );
};



const StoreAvailability = () => {
    const products = useInventoryStore((state) => state.products);
    const getStockColor = (stock: string) => {
        switch (stock) {
            case 'In Stock': return 'bg-green-500';
            case 'Low Stock': return 'bg-yellow-500';
            case 'Out of Stock': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
    <section className="bg-light dark:bg-primary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-bold uppercase text-secondary dark:text-light">Store Availability</h2>
                <p className="mt-2 text-lg text-secondary/80 dark:text-light/60">Your pit stop for snacks, drinks, and essentials.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                {products.map(item => (
                    <div key={item.id} className="relative group aspect-[3/4] rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-accent/80 transition-all duration-300">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                            <h3 className="text-lg font-bold text-light truncate">{item.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className={`w-3 h-3 rounded-full ${getStockColor(item.stock)}`}></span>
                                <span className="text-sm text-light/80">{item.stock}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    )
};


const SubwaySection = () => (
    
      <section className="relative py-16 sm:py-24 text-white">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' }}
            aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-primary/80" aria-hidden="true"></div>
    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <img
        src="https://res.cloudinary.com/disrdtslz/image/upload/v1760110555/subway_nbkigw.jpg"
        alt="Subway Logo"
        className="w-64 mx-auto mb-6 brightness-125"
      />
      <h2 className="font-heading text-4xl font-bold uppercase">
        Fresh Fuel, Fresh Food
      </h2>
      <p className="mt-2 text-lg text-light/80 max-w-2xl mx-auto mb-8">
        Grab a delicious, fresh sub from the Subway located right inside our
        station. Open 9 AM - 10 PM daily.
      </p>
      <a
        href="https://www.subway.com/en-us/menunutrition"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-accent text-white font-bold rounded-md hover:bg-accent/90 transition-all text-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50"
      >
        Order Ahead
      </a>
    </div>
  </section>
);


const FacilitiesSection = () => {
    const [restroomStatus, setRestroomStatus] = useState<'Available' | 'Occupied' | 'Cleaning'>('Available');
    const facilities = [
        { icon: Restroom, name: 'Restroom', status: restroomStatus, color: restroomStatus === 'Available' ? 'text-green-500' : restroomStatus === 'Occupied' ? 'text-yellow-500' : 'text-blue-500' },
        { icon: AirPump, name: 'Air Pump' },
        { icon: Atm, name: 'ATM' },
        { icon: Vacuum, name: 'Vacuum Cleaner' },
    ];

    return (
        <section className="bg-light dark:bg-primary py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl font-bold uppercase text-secondary dark:text-light">Station Facilities</h2>
                    <p className="mt-2 text-lg text-secondary/80 dark:text-light/60">All the amenities for a smooth journey.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {facilities.map((facility) => (
                        <div key={facility.name} className="bg-secondary/30 dark:bg-secondary p-6 rounded-lg text-center shadow-lg border border-transparent hover:border-accent/50 transition-colors">
                            <facility.icon className="w-12 h-12 text-accent mx-auto mb-4"/>
                            <p className="font-bold text-lg text-secondary dark:text-light">{facility.name}</p>
                            {facility.status && (
                                <p className={`text-sm font-semibold ${facility.color}`}>{facility.status}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
  return (
    <div>
      <Hero />
      <StoreAvailability />
      <SubwaySection />
      <FacilitiesSection />
    </div>
  );
};

export default Home;
