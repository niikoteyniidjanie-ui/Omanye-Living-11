import React from 'react';
import { Listing } from '../types';
import { Bed, Bath, Maximize, MapPin, Heart, ArrowUpRight, Share2, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ListingCardProps {
  listing: Listing;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onShowFinancing?: (listing: Listing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isWishlisted, onToggleWishlist, onShowFinancing }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Sharing listing: ${listing.title} at ${listing.location}`);
  };

  const handleFinancing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShowFinancing) onShowFinancing(listing);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      viewport={{ once: true }}
      className="group cursor-pointer bg-white rounded-2xl p-3 shadow-sm transition-all duration-500 border border-stone-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-100">
        <img
          src={listing.image_url}
          alt={`${listing.type} in ${listing.location} named ${listing.title}`}
          aria-label={`Property image: ${listing.title}`}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest text-stone-900 shadow-sm">
            {listing.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(listing.id);
            }}
            aria-label={isWishlisted ? `Remove ${listing.title} from wishlist` : `Add ${listing.title} to wishlist`}
            className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors group/heart"
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400 group-hover/heart:text-red-400'}`} 
            />
          </button>
          <button 
            onClick={handleShare}
            aria-label={`Share ${listing.title}`}
            className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors text-stone-400 hover:text-stone-900"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
        {listing.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-stone-900 text-white px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-3 space-y-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
          <h3 className="font-serif text-sm sm:text-base md:text-lg text-stone-900 group-hover:text-stone-600 transition-colors truncate">
            {listing.title}
          </h3>
          <p className="font-sans font-semibold text-stone-900 text-xs sm:text-sm">
            ${listing.price.toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center text-stone-500 text-[10px] sm:text-xs">
          <MapPin className="w-3 h-3 mr-1 shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        <div className="flex items-center text-stone-400 text-[9px] uppercase tracking-widest font-bold">
          <span className="text-stone-300 mr-1">Listed by</span>
          <Link 
            to={`/company/${listing.company_id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-stone-600 truncate hover:text-stone-900 transition-colors underline decoration-stone-200 underline-offset-2"
          >
            {listing.company_name}
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 pt-2 text-stone-400 text-[9px] sm:text-xs border-t border-stone-100">
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            <span>{listing.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            <span>{listing.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-3 h-3" />
            <span className="hidden sm:inline">{listing.sqft} sqft</span>
            <span className="sm:hidden">{listing.sqft}</span>
          </div>
        </div>

        {listing.mortgage_provider_ids && listing.mortgage_provider_ids.length > 0 && (
          <div className="pt-2">
            <button 
              onClick={handleFinancing}
              className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border border-emerald-100"
            >
              <DollarSign className="w-3 h-3" />
              Financing Options
            </button>
          </div>
        )}

        <div className="pt-2">
          <Link 
            to={`/listing/${listing.id}`}
            aria-label={`View details for ${listing.title}`}
            className="w-full flex items-center justify-center gap-2 py-2 bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-900 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border border-stone-200"
          >
            View Details
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
