import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItemCard from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Clock, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// Mock data - in a real app, this would come from an API
const mockRestaurantData: { [key: string]: any } = {
  '1': {
    name: 'Pizza Paradise',
    logoUrl: 'https://source.unsplash.com/random/100x100?pizzeria',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400?pizza-restaurant',
    rating: 4.5,
    deliveryTime: '25-35 min',
    cuisine: 'Italian',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200?margherita-pizza' },
      { id: 'm2', name: 'Pepperoni Passion', description: 'Loaded with pepperoni and mozzarella.', price: 15.50, imageUrl: 'https://source.unsplash.com/random/300x200?pepperoni-pizza' },
      { id: 'm3', name: 'Veggie Delight', description: 'A mix of fresh garden vegetables.', price: 14.00, imageUrl: 'https://source.unsplash.com/random/300x200?veggie-pizza' },
      { id: 'm4', name: 'Coca-Cola', description: 'Refreshing carbonated drink.', price: 2.50, imageUrl: 'https://source.unsplash.com/random/300x200?coca-cola' },
    ]
  },
  '2': {
    name: 'Taco Town',
    logoUrl: 'https://source.unsplash.com/random/100x100?taqueria',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400?mexican-food',
    rating: 4.2,
    deliveryTime: '20-30 min',
    cuisine: 'Mexican',
    menu: [
      { id: 'm5', name: 'Chicken Tacos (3)', description: 'Grilled chicken, salsa, cilantro.', price: 9.99, imageUrl: 'https://source.unsplash.com/random/300x200?chicken-tacos' },
      { id: 'm6', name: 'Beef Burrito', description: 'Large burrito with beef, beans, rice.', price: 12.50, imageUrl: 'https://source.unsplash.com/random/300x200?beef-burrito' },
    ]
  }
  // Add more restaurants as needed
};

const RestaurantMenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]); // Simplified cart state for this page
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [currentItemForCustomization, setCurrentItemForCustomization] = useState<any>(null);

  useEffect(() => {
    console.log('RestaurantMenuPage loaded for restaurant ID:', restaurantId);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (restaurantId && mockRestaurantData[restaurantId]) {
        setRestaurant(mockRestaurantData[restaurantId]);
      } else {
        // Handle restaurant not found, maybe navigate to a 404 page or back
        navigate('/discovery');
      }
      setIsLoading(false);
    }, 1000);
  }, [restaurantId, navigate]);

  const handleAddToCart = (itemId: string | number) => {
    const item = restaurant.menu.find((i: any) => i.id === itemId);
    if (item) {
      setCart(prevCart => [...prevCart, item]);
      console.log(`Added ${item.name} to cart.`);
      // Here you would typically dispatch an action to a global cart state
      // For now, just log and update local count for Header
    }
  };

  const handleCustomizeItem = (itemId: string | number) => {
    const item = restaurant.menu.find((i: any) => i.id === itemId);
    setCurrentItemForCustomization(item);
    setIsCustomizationDialogOpen(true);
    console.log(`Customize ${item?.name}`);
  };

  const cartItemCount = cart.length; // For Header prop

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-1/4 mb-4" /> {/* Back button */}
          <Skeleton className="h-48 w-full mb-6 rounded-lg" /> {/* Cover Image */}
          <div className="flex items-center mb-6 space-x-4">
            <Skeleton className="h-24 w-24 rounded-full" /> {/* Avatar */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" /> {/* Name */}
              <Skeleton className="h-4 w-32" /> {/* Cuisine */}
              <Skeleton className="h-4 w-24" /> {/* Rating/Time */}
            </div>
          </div>
          <Separator className="my-6" />
          <Skeleton className="h-8 w-1/3 mb-6" /> {/* Menu Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-32 w-full rounded" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Header cartItemCount={cartItemCount}/>
        <p className="text-xl text-gray-700">Restaurant not found.</p>
        <Button onClick={() => navigate('/discovery')} className="mt-4">Go to Discovery</Button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-grow">
        {/* Restaurant Header Section */}
        <div className="relative h-48 md:h-64 bg-gray-200">
          <img src={restaurant.coverImageUrl || 'https://source.unsplash.com/random/1200x400?restaurant-interior'} alt={`${restaurant.name} cover`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"/>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            aria-label="Go back"
            >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="container mx-auto px-4 -mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md -mt-12 sm:-mt-16 mb-4 sm:mb-0 sm:mr-6">
                        <AvatarImage src={restaurant.logoUrl} alt={`${restaurant.name} logo`} />
                        <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left flex-grow">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{restaurant.name}</h1>
                        <p className="text-gray-600 text-sm mt-1">{restaurant.cuisine}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-3 mt-2 text-sm text-gray-700">
                            <span className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" /> {restaurant.rating.toFixed(1)}</span>
                            <span className="text-gray-400">|</span>
                            <span className="flex items-center"><Clock className="h-4 w-4 text-orange-500 mr-1" /> {restaurant.deliveryTime}</span>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/cart')} variant="outline" className="mt-4 sm:mt-0">
                        <ShoppingCartIcon className="mr-2 h-4 w-4" /> View Cart ({cartItemCount})
                    </Button>
                </div>
            </div>
        </div>
        
        <Separator className="my-0 md:my-2 container mx-auto" />

        {/* Menu Items Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Menu</h2>
          {restaurant.menu && restaurant.menu.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.menu.map((item: any) => (
                <MenuItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onAddToCart={() => handleAddToCart(item.id)}
                  onCustomize={item.customizable ? () => handleCustomizeItem(item.id) : undefined}
                  isAddedToCart={cart.some(cartItem => cartItem.id === item.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No menu items available at the moment.</p>
          )}
        </section>
      </main>

      {/* Customization Dialog (Example) */}
      {currentItemForCustomization && (
        <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customize {currentItemForCustomization.name}</DialogTitle>
              <DialogDescription>
                Make selections for your item. (Placeholder for customization options)
              </DialogDescription>
            </DialogHeader>
            {/* Add customization form elements here, e.g., RadioGroup, Checkbox */}
            <p className="my-4">Customization options would go here...</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                handleAddToCart(currentItemForCustomization.id); // Add customized item
                setIsCustomizationDialogOpen(false);
              }}>Add to Cart</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;