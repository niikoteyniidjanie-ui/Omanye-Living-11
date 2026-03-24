import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Listing, MortgageProvider } from '../types';
import { Bed, Bath, Maximize, MapPin, ArrowLeft, Heart, Share2, X, ChevronLeft, ChevronRight, Building2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import ListingCard from './ListingCard';
import MortgageOptionsModal from './MortgageOptionsModal';

interface ListingDetailProps {
  listings: Listing[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onShowFinancing?: (listing: Listing) => void;
  mortgageProviders: MortgageProvider[];
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listings, wishlist, onToggleWishlist, onShowFinancing, mortgageProviders }) => {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find(l => l.id === id);
  const isWishlisted = wishlist.includes(id || '');
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);

  const images = [
    listing?.image_url,
    `${listing?.image_url}&sig=1`,
    `${listing?.image_url}&sig=2`,
    `${listing?.image_url}&sig=3`,
  ].filter(Boolean) as string[];

  const similarListings = listings
    .filter(l => l.id !== id && (l.type === listing?.type || l.location.includes(listing?.location.split(',')[1]?.trim() || '')))
    .slice(0, 4);
  
  const handleShare = async () => {
    const shareData = {
      title: `Omanye Living - ${listing?.title}`,
      text: listing?.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev! - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev! + 1) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Listing not found</h2>
          <Link to="/" className="text-stone-500 hover:text-stone-900 underline">Return to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors group"
          aria-label="Back to listings"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setLightboxIndex(0)}
              className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group relative"
              aria-label="Open image gallery"
            >
              <img 
                src={listing.image_url} 
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <Maximize className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
              </div>
            </button>
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1).map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setLightboxIndex(i + 1)}
                  className="aspect-square rounded-2xl overflow-hidden bg-stone-200 group relative"
                  aria-label={`View gallery image ${i + 2}`}
                >
                  <img 
                    src={img} 
                    alt={`${listing.title} detail ${i + 1}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-stone-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {listing.type}
                </span>
                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                  {listing.status}
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-4 leading-tight">
                {listing.title}
              </h1>
              <div className="flex items-center text-stone-500 gap-2 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-lg font-light">{listing.location}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-6 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Listed by</p>
                  <Link 
                    to={`/company/${listing.company_id}`}
                    className="text-sm font-semibold text-stone-900 hover:underline"
                  >
                    {listing.company_name}
                  </Link>
                </div>
              </div>

              <p className="font-sans text-3xl font-semibold text-stone-900">
                ${listing.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-8 py-8 border-y border-stone-200">
              <div className="text-center">
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2">Bedrooms</p>
                <div className="flex items-center gap-2 justify-center">
                  <Bed className="w-5 h-5 text-stone-900" />
                  <span className="text-xl font-medium">{listing.beds}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2">Bathrooms</p>
                <div className="flex items-center gap-2 justify-center">
                  <Bath className="w-5 h-5 text-stone-900" />
                  <span className="text-xl font-medium">{listing.baths}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2">Area</p>
                <div className="flex items-center gap-2 justify-center">
                  <Maximize className="w-5 h-5 text-stone-900" />
                  <span className="text-xl font-medium">{listing.sqft} <span className="text-sm text-stone-400">sqft</span></span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl">Description</h3>
              <p className="text-stone-600 leading-relaxed font-light text-lg">
                {listing.description} This exquisite property offers a unique blend of sophisticated design and modern comfort. 
                Experience unparalleled luxury with high-end finishes throughout, spacious living areas, and breathtaking views 
                that define the essence of Omanye Living.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <div className="flex-1 flex flex-col gap-4">
                <button 
                  className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10"
                  aria-label="Contact listing agent"
                >
                  Contact Agent
                </button>
                {listing.mortgage_provider_ids && listing.mortgage_provider_ids.length > 0 && (
                  <button 
                    onClick={() => setIsFinancingModalOpen(true)}
                    className="w-full bg-emerald-50 text-emerald-700 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-100 transition-colors border border-emerald-100 flex items-center justify-center gap-2"
                    aria-label="View financing options"
                  >
                    <DollarSign className="w-5 h-5" />
                    Financing Options
                  </button>
                )}
              </div>
              <div className="flex gap-4 items-start">
                <button 
                  onClick={() => onToggleWishlist(listing.id)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`p-4 rounded-xl border transition-all ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900'}`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-4 rounded-xl border border-stone-200 bg-white text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all relative"
                  aria-label="Share this listing"
                >
                  <Share2 className="w-6 h-6" />
                  <AnimatePresence>
                    {showCopied && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -30 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap"
                      >
                        Link Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Listings Section */}
        <section className="mt-32 pt-20 border-t border-stone-200">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
                Recommendations
              </span>
              <h2 className="font-serif text-4xl text-stone-900 tracking-tight">
                Similar <span className="italic">Properties</span>
              </h2>
            </div>
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarListings.map((l) => (
              <Link key={l.id} to={`/listing/${l.id}`} className="block">
                <ListingCard 
                  listing={l} 
                  isWishlisted={wishlist.includes(l.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative group max-w-5xl w-full aspect-[4/3]">
              <button 
                onClick={() => setLightboxIndex(prev => (prev! - 1 + images.length) % images.length)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-all p-4 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full rounded-2xl overflow-hidden"
              >
                <img 
                  src={images[lightboxIndex]} 
                  alt={`Gallery image ${lightboxIndex + 1}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <button 
                onClick={() => setLightboxIndex(prev => (prev! + 1) % images.length)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-all p-4 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightboxIndex ? 'bg-white w-4' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MortgageOptionsModal 
        listing={listing}
        providers={mortgageProviders}
        isOpen={isFinancingModalOpen}
        onClose={() => setIsFinancingModalOpen(false)}
      />
    </div>
  );
};

export default ListingDetail;
