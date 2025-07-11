
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Sprout, 
  Package, 
  Wallet, 
  Menu, 
  X
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Cons.GPT', path: '/', icon: MapPin },
    { title: 'Cons.SLM', path: '/', icon: Sprout },
    { title: 'Lexical Search', path: '/', icon: Package },
    { title: 'Semantic Search', path: '/', icon: Wallet },
  ];

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={toggleSidebar} 
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-border shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:relative md:translate-x-0 flex flex-col h-full`}
      >
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-agri-primary" />
            <span className="text-lg font-bold text-foreground">Cons.IA</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors bg-agri-primary/10 text-agri-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 text-agri-primary" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">EV</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Evoluciólogo</p>
              <p className="text-xs text-muted-foreground truncate">transmentor@interludio.ccce</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
