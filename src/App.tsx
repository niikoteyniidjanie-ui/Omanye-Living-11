import { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Listing, Company, MortgageProvider } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListingCard from './components/ListingCard';
import ListingDetail from './components/ListingDetail';
import CompanyPage from './components/CompanyPage';
import MortgageServicePage from './components/MortgageServicePage';
import MortgageProviderPage from './components/MortgageProviderPage';
import MortgageOptionsModal from './components/MortgageOptionsModal';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown, Heart, X } from 'lucide-react';

const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Elite Realty Group',
    logo_url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
    description: 'Specializing in high-end luxury properties in Montecito and beyond.',
    leadership: [
      { name: 'Sarah Johnson', role: 'CEO & Founder', image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
      { name: 'Michael Chen', role: 'Head of Sales', image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' }
    ],
    listings_ids: ['1']
  },
  {
    id: 'c2',
    name: 'Skyline Properties',
    logo_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    description: 'Leading the way in urban luxury and penthouse living in Manhattan.',
    leadership: [
      { name: 'David Miller', role: 'Managing Director', image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
    ],
    listings_ids: ['2']
  }
];

const MOCK_MORTGAGE_PROVIDERS: MortgageProvider[] = [
  {
    id: 'm1',
    name: 'Global Finance',
    logo_url: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=200&q=80',
    description: 'Global Finance provides tailored mortgage solutions for international property buyers.',
    terms: 'Up to 80% LTV, fixed rates from 3.5%, terms up to 30 years.',
    interest_rate: 3.5,
    max_loan_amount: 10000000
  },
  {
    id: 'm2',
    name: 'Prime Mortgages',
    logo_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80',
    description: 'Prime Mortgages specializes in jumbo loans for high-net-worth individuals.',
    terms: 'Flexible repayment options, interest-only periods available.',
    interest_rate: 4.2,
    max_loan_amount: 25000000
  }
];

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'The Glass Pavilion',
    price: 4250000,
    location: 'Montecito, California',
    beds: 4,
    baths: 5,
    sqft: 5200,
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'A masterpiece of modern architecture with floor-to-ceiling glass walls.',
    type: 'Villa',
    status: 'For Sale',
    featured: true,
    company_name: 'Elite Realty Group',
    company_id: 'c1',
    mortgage_provider_ids: ['m1', 'm2']
  },
  {
    id: '2',
    title: 'Ethereal Heights Penthouse',
    price: 8900000,
    location: 'Tribeca, New York',
    beds: 3,
    baths: 4,
    sqft: 3800,
    image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Panoramic views of the Manhattan skyline with private elevator access.',
    type: 'Penthouse',
    status: 'For Sale',
    company_name: 'Skyline Properties',
    company_id: 'c2',
    mortgage_provider_ids: ['m2']
  },
  {
    id: '3',
    title: 'Stone & Cedar Retreat',
    price: 2100000,
    location: 'Aspen, Colorado',
    beds: 5,
    baths: 6,
    sqft: 6400,
    image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    description: 'A warm, organic mountain retreat blending seamlessly with nature.',
    type: 'House',
    status: 'For Sale',
    company_name: 'Mountain Peak Homes',
    company_id: 'c3'
  },
  {
    id: '4',
    title: 'Azure Coast Villa',
    price: 12500000,
    location: 'Cap d\'Antibes, France',
    beds: 6,
    baths: 8,
    sqft: 8500,
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking Mediterranean views with a private infinity pool.',
    type: 'Villa',
    status: 'For Sale',
    featured: true,
    company_name: 'Riviera Estates',
    company_id: 'c4',
    mortgage_provider_ids: ['m1']
  },
  {
    id: '5',
    title: 'Minimalist Loft',
    price: 1850000,
    location: 'Shoreditch, London',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image_url: 'https://images.unsplash.com/photo-1600607687940-47a0f925901e?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial elegance meets contemporary design in the heart of London.',
    type: 'Apartment',
    status: 'For Sale',
    company_name: 'Urban Living Co.',
    company_id: 'c5'
  },
  {
    id: '6',
    title: 'The Oak Residence',
    price: 3400000,
    location: 'Portland, Oregon',
    beds: 4,
    baths: 4,
    sqft: 4200,
    image_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    description: 'Sustainable luxury with reclaimed materials and smart home integration.',
    type: 'House',
    status: 'For Sale',
    company_name: 'Eco-Luxury Builders',
    company_id: 'c6'
  }
];

function MainApp({ wishlist, toggleWishlist, onShowFinancing }: { wishlist: string[], toggleWishlist: (id: string) => void, onShowFinancing: (l: Listing) => void }) {
  const [listings] = useState<Listing[]>(MOCK_LISTINGS);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesCategory = filter === 'All' || listing.type === filter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        listing.location.toLowerCase().includes(query) ||
        listing.title.toLowerCase().includes(query) ||
        listing.price.toString().includes(query) ||
        listing.beds.toString().includes(query) ||
        listing.baths.toString().includes(query);
      
      return matchesCategory && matchesSearch;
    });
  }, [listings, filter, searchQuery]);

  const categories = ['All', 'House', 'Apartment', 'Villa', 'Penthouse'];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main>
        <Hero 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          filter={filter} 
          setFilter={setFilter} 
          categories={categories}
        />
        
        <section className="max-w-7xl mx-auto px-6 py-24">
          <AnimatePresence mode="popLayout">
            {filteredListings.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12"
              >
                {filteredListings.map((listing) => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    isWishlisted={wishlist.includes(listing.id)}
                    onToggleWishlist={toggleWishlist}
                    onShowFinancing={onShowFinancing}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-stone-400 font-serif text-2xl italic">No properties match your search.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setFilter('All');}}
                  className="mt-4 text-stone-900 font-bold uppercase tracking-widest text-xs underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="bg-stone-900 text-white py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[0.9]">
                  Elevating the <br />
                  <span className="italic">living experience</span>.
                </h2>
                <p className="text-stone-400 text-lg max-w-md mb-12 font-light leading-relaxed">
                  We believe that a home is more than just a structure; it's a reflection of your soul and a sanctuary for your dreams.
                </p>
                <button className="border border-white/20 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-500">
                  Our Philosophy
                </button>
              </motion.div>
              
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80" 
                    alt="Interior Design"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute -bottom-12 -left-12 bg-white p-8 rounded-2xl hidden md:block">
                  <p className="text-stone-900 font-serif text-2xl mb-2 italic">"Design is thinking made visual."</p>
                  <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">— Saul Bass</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-stone-50 border-t border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <a href="/" className="font-serif text-3xl tracking-tight font-medium mb-8 block">
                Omanye<span className="text-stone-400">.</span>
              </a>
              <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                Redefining luxury real estate through architectural excellence and unparalleled service.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-6">Explore</h4>
              <ul className="space-y-4 text-stone-500 text-sm">
                <li><a href="#" className="hover:text-stone-900 transition-colors">Listings</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">Developments</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">Journal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-6">Connect</h4>
              <ul className="space-y-4 text-stone-500 text-sm">
                <li><a href="#" className="hover:text-stone-900 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-stone-900 transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-medium">
              © 2026 Omanye Living. All rights reserved.
            </p>
            <div className="flex gap-8 text-stone-400 text-[10px] uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('omanye_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedListingForFinancing, setSelectedListingForFinancing] = useState<Listing | null>(null);

  useEffect(() => {
    localStorage.setItem('omanye_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp wishlist={wishlist} toggleWishlist={toggleWishlist} onShowFinancing={(l) => setSelectedListingForFinancing(l)} />} />
        <Route path="/listing/:id" element={<ListingDetail listings={MOCK_LISTINGS} wishlist={wishlist} onToggleWishlist={toggleWishlist} onShowFinancing={(l) => setSelectedListingForFinancing(l)} mortgageProviders={MOCK_MORTGAGE_PROVIDERS} />} />
        <Route path="/company/:id" element={<CompanyPage companies={MOCK_COMPANIES} listings={MOCK_LISTINGS} wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
        <Route path="/financing" element={<MortgageServicePage providers={MOCK_MORTGAGE_PROVIDERS} />} />
        <Route path="/mortgage/:id" element={<MortgageProviderPage providers={MOCK_MORTGAGE_PROVIDERS} />} />
      </Routes>
      {selectedListingForFinancing && (
        <MortgageOptionsModal 
          listing={selectedListingForFinancing}
          providers={MOCK_MORTGAGE_PROVIDERS}
          isOpen={!!selectedListingForFinancing}
          onClose={() => setSelectedListingForFinancing(null)}
        />
      )}
    </Router>
  );
}
