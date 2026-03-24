import { motion } from 'motion/react';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  categories: string[];
}

export default function Hero({ searchQuery, setSearchQuery, filter, setFilter, categories }: HeroProps) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6199f74209?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Home"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] mb-6 opacity-90">
            Exclusively Curated
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tight leading-[0.9]">
            Find your <br />
            <span className="italic">sanctuary</span>.
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full flex items-center w-full max-w-2xl">
              <div className="flex items-center flex-1 px-4">
                <SearchIcon className="w-4 h-4 text-white/60 mr-2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, style, or feature..."
                  className="bg-transparent border-none outline-none py-3 text-sm w-full placeholder:text-white/60 text-white"
                />
              </div>
              
              <div className="hidden sm:flex items-center border-l border-white/20 px-4 group relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent border-none outline-none py-3 text-xs font-bold uppercase tracking-widest text-white/80 cursor-pointer appearance-none pr-6"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="text-stone-900">{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 w-3 h-3 text-white/60 pointer-events-none group-hover:text-white transition-colors" />
              </div>

              <button className="bg-white text-stone-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors ml-2">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-white/30"
        />
      </div>
    </section>
  );
}
