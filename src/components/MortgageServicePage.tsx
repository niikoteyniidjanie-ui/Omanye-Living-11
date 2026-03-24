import React from 'react';
import { Link } from 'react-router-dom';
import { MortgageProvider } from '../types';
import Navbar from './Navbar';
import { motion } from 'motion/react';
import { DollarSign, Percent, ShieldCheck, ArrowRight } from 'lucide-react';

interface MortgageServicePageProps {
  providers: MortgageProvider[];
}

export default function MortgageServicePage({ providers }: MortgageServicePageProps) {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
            Financing Solutions
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-900 tracking-tight mb-8">
            Mortgage <span className="italic">Services</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Connect with our curated network of premier mortgage providers to find the perfect financing solution for your dream home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 mx-auto mb-6">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl mb-4">Competitive Rates</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Access the most competitive interest rates in the market through our exclusive partnerships.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 mx-auto mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl mb-4">Flexible Terms</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Choose from a variety of loan terms and structures tailored to your unique financial situation.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 mx-auto mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl mb-4">Secure Process</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Experience a transparent and secure application process with dedicated support at every step.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <motion.div 
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-16 h-16 bg-stone-100 rounded-2xl mb-6 overflow-hidden">
                <img src={provider.logo_url} alt={provider.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4">{provider.name}</h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 line-clamp-3">
                {provider.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                <div className="text-stone-900">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Interest Rates from</p>
                  <p className="text-lg font-semibold">{provider.interest_rate}%</p>
                </div>
                <Link 
                  to={`/mortgage/${provider.id}`}
                  className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
