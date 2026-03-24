import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Company, Listing } from '../types';
import Navbar from './Navbar';
import ListingCard from './ListingCard';
import { motion } from 'motion/react';
import { Mail, Phone, Globe, MapPin, Users } from 'lucide-react';

interface CompanyPageProps {
  companies: Company[];
  listings: Listing[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export default function CompanyPage({ companies, listings, wishlist, onToggleWishlist }: CompanyPageProps) {
  const { id } = useParams<{ id: string }>();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Company not found</h2>
          <Link to="/" className="text-stone-500 hover:text-stone-900 underline">Return to home</Link>
        </div>
      </div>
    );
  }

  const companyListings = listings.filter(l => l.company_id === company.id);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm"
            >
              <div className="w-24 h-24 bg-stone-100 rounded-2xl mb-6 overflow-hidden">
                <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="font-serif text-3xl text-stone-900 mb-4">{company.name}</h1>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                {company.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@{company.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">www.{company.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Beverly Hills, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Leadership */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-stone-900" />
                <h2 className="font-serif text-xl">Leadership</h2>
              </div>
              <div className="space-y-6">
                {company.leadership.map((leader, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100">
                      <img src={leader.image_url} alt={leader.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{leader.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{leader.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Listings */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
                Portfolio
              </span>
              <h2 className="font-serif text-4xl text-stone-900 tracking-tight">
                Active <span className="italic">Listings</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyListings.map((listing) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  isWishlisted={wishlist.includes(listing.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
