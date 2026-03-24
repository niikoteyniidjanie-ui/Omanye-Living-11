import React from 'react';
import { Listing, MortgageProvider } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MortgageOptionsModalProps {
  listing: Listing;
  providers: MortgageProvider[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MortgageOptionsModal({ listing, providers, isOpen, onClose }: MortgageOptionsModalProps) {
  const listingProviders = providers.filter(p => listing.mortgage_provider_ids?.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-stone-900 mb-1">Financing Options</h2>
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Available for {listing.title}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6">
              {listingProviders.length > 0 ? (
                listingProviders.map((provider) => (
                  <div key={provider.id} className="bg-stone-50 p-6 rounded-2xl border border-stone-100 hover:border-stone-200 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-sm">
                          <img src={provider.logo_url} alt={provider.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-stone-900">{provider.name}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Preferred Partner</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Estimated Rate</p>
                        <p className="text-xl font-semibold text-stone-900">{provider.interest_rate}%</p>
                      </div>
                    </div>
                    
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                      {provider.terms}
                    </p>

                    <div className="flex items-center gap-4">
                      <Link 
                        to={`/mortgage/${provider.id}`}
                        onClick={onClose}
                        className="flex-1 bg-white border border-stone-200 text-stone-900 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-stone-900 transition-all text-center flex items-center justify-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        View Terms
                      </Link>
                      <button className="flex-1 bg-stone-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                  <p className="text-stone-400 font-serif text-xl italic">No specific mortgage providers listed for this property.</p>
                  <Link 
                    to="/financing" 
                    onClick={onClose}
                    className="mt-4 inline-block text-stone-900 font-bold uppercase tracking-widest text-xs underline"
                  >
                    View all financing options
                  </Link>
                </div>
              )}
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-100 text-center">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                * Rates and terms are subject to credit approval and property valuation.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
