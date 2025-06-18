import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu as MenuIcon } from 'lucide-react'; // Added Search and MenuIcon

interface HeaderProps {
  cartItemCount?: number; // Optional: to display number of items in cart
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  console.log("Rendering Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Dummy links - replace with actual navigation
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/discovery", label: "Discover" },
    { href: "/orders", label: "My Orders" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-orange-600">
              {/* Placeholder for Logo, e.g., <img className="h-8 w-auto" src="/logo.svg" alt="AppLogo" /> */}
              FoodApp
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, User Icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/account"> {/* Assuming /account or /profile route */}
              <Button variant="ghost" size="icon" aria-label="User Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-40 bg-white shadow-lg">
          <div className="rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.label}`}
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;