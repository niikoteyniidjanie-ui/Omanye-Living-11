import { Search, Menu, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-xl border-bottom border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="font-serif text-2xl tracking-tight font-medium">
            Omanye<span className="text-stone-400">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-stone-500">
            <a href="#/financing" className="hover:text-stone-900 transition-colors">Financing</a>
            <a href="#" className="hover:text-stone-900 transition-colors">About</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-stone-200/50 rounded-full transition-colors">
            <Search className="w-5 h-5 text-stone-600" />
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors">
            <User className="w-4 h-4" />
            Sign In
          </button>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
