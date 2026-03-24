import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MortgageProvider } from '../types';
import Navbar from './Navbar';
import { motion } from 'motion/react';
import { DollarSign, Percent, ShieldCheck, Mail, Phone, Globe, MapPin, CheckCircle2 } from 'lucide-react';

interface MortgageProviderPageProps {
  providers: MortgageProvider[];
}

export default function MortgageProviderPage({ providers }: MortgageProviderPageProps) {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Provider not found</h2>
          <Link to="/financing" className="text-stone-500 hover:text-stone-900 underline">Return to financing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Provider Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm"
            >
              <div className="w-24 h-24 bg-stone-100 rounded-2xl mb-6 overflow-hidden">
                <img src={provider.logo_url} alt={provider.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="font-serif text-3xl text-stone-900 mb-4">{provider.name}</h1>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                {provider.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@{provider.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">www.{provider.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Financial District, NY</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-stone-900 text-white p-8 rounded-3xl shadow-xl"
            >
              <h3 className="font-serif text-xl mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Interest Rate</p>
                  <p className="text-xl font-semibold">from {provider.interest_rate}%</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Max Loan</p>
                  <p className="text-xl font-semibold">${(provider.max_loan_amount || 0).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Processing Time</p>
                  <p className="text-xl font-semibold">14-21 Days</p>
                </div>
              </div>
              <button className="w-full bg-white text-stone-900 py-4 rounded-xl font-bold uppercase tracking-widest mt-8 hover:bg-stone-100 transition-colors">
                Apply Now
              </button>
            </motion.div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
                  Service Details
                </span>
                <h2 className="font-serif text-4xl text-stone-900 tracking-tight">
                  Mortgage <span className="italic">Terms</span>
                </h2>
              </div>
              <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
                <p className="text-stone-600 leading-relaxed font-light text-lg mb-8">
                  {provider.terms}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Fixed and Adjustable Rate Mortgages',
                    'Jumbo Loan Specialists',
                    'First-Time Homebuyer Programs',
                    'Refinancing Options',
                    'Dedicated Mortgage Advisors',
                    'Online Application Tracking'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-stone-900" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-stone-100 p-12 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Percent className="w-8 h-8 text-stone-900 mx-auto mb-4" />
                  <h4 className="font-serif text-lg mb-2">Low APR</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Industry leading annual percentage rates.</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-stone-900 mx-auto mb-4" />
                  <h4 className="font-serif text-lg mb-2">Zero Hidden Fees</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Transparent pricing with no surprises.</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="w-8 h-8 text-stone-900 mx-auto mb-4" />
                  <h4 className="font-serif text-lg mb-2">Trusted Partner</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">Over 25 years of financial excellence.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
