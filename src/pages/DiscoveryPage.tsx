import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import CuisineFilterChip from '@/components/CuisineFilterChip';
import RestaurantCard from '@/components/RestaurantCard';
import Footer from '@/components/layout/Footer';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cuisines = ['Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Fast Food', 'Healthy'];

const placeholderRestaurants = [
  { id: '1', name: 'Pizza Paradise', imageUrl: 'https://source.unsplash.com/random/400x300?pizza', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-35 min' },
  { id: '2', name: 'Taco Town', imageUrl: 'https://source.unsplash.com/random/400x300?taco', cuisineTypes: ['Mexican'], rating: 4.2, deliveryTime: '20-30 min' },
  { id: '3', name: 'Wok Wonders', imageUrl: 'https://source.unsplash.com/random/400x300?chinese-food', cuisineTypes: ['Chinese', 'Asian'], rating: 4.7, deliveryTime: '30-40 min' },
  { id: '4', name: 'Curry Corner', imageUrl: 'https://source.unsplash.com/random/400x300?curry', cuisineTypes: ['Indian'], rating: 4.6, deliveryTime: '35-45 min' },
  { id: '5', name: 'Sushi Spot', imageUrl: 'https://source.unsplash.com/random/400x300?sushi', cuisineTypes: ['Japanese'], rating: 4.8, deliveryTime: '40-50 min' },
];

const DiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('DiscoveryPage loaded');
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCuisines.length === 0 || selectedCuisines.some(c => restaurant.cuisineTypes.includes(c)))
  );

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu className="bg-white shadow-sm p-2 justify-center sticky top-0 z-40">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
              FoodApp
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/discovery" className={navigationMenuTriggerStyle()}>
              Discover
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/orders" className={navigationMenuTriggerStyle()}>
              My Orders
            </NavigationMenuLink>
          </NavigationMenuItem>
           <NavigationMenuItem>
            <NavigationMenuLink href="/cart" className={navigationMenuTriggerStyle()}>
              Cart
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section aria-labelledby="search-filter-heading" className="mb-8">
          <h1 id="search-filter-heading" className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Find Your Next Meal
          </h1>
          <p className="text-center text-gray-600 mb-6">Discover amazing restaurants and cuisines near you.</p>
          <div className="relative mb-6 max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search restaurants, cuisines..."
              className="w-full pl-10 pr-4 py-3 text-base rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for restaurants or cuisines"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Filter by Cuisine</h2>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                All Filters
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex space-x-2">
                {cuisines.map(cuisine => (
                  <CuisineFilterChip
                    key={cuisine}
                    label={cuisine}
                    isSelected={selectedCuisines.includes(cuisine)}
                    onClick={() => handleCuisineToggle(cuisine)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </section>

        <section aria-labelledby="restaurant-listings-heading">
          <h2 id="restaurant-listings-heading" className="text-2xl font-semibold text-gray-800 mb-6">
            {searchTerm || selectedCuisines.length > 0 ? 'Matching Restaurants' : 'Popular Restaurants'}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[180px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRestaurants.map(restaurant => (
                    <RestaurantCard
                      key={restaurant.id}
                      {...restaurant}
                      onClick={handleRestaurantClick}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-10">
                  No restaurants found matching your criteria. Try adjusting your search or filters.
                </p>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoveryPage;