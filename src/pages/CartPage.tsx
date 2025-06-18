import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import MenuItemCard from '@/components/MenuItemCard'; // Re-using for display, or use a simpler display
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trash2, Info, ShoppingCart } from 'lucide-react';

// Mock cart items - in a real app, this would come from global state (e.g., Redux, Zustand, Context)
const initialCartItems = [
  { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/150x100?margherita-pizza', quantity: 1 },
  { id: 'm4', name: 'Coca-Cola', description: 'Refreshing carbonated drink.', price: 2.50, imageUrl: 'https://source.unsplash.com/random/150x100?coca-cola', quantity: 2 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example tax rate
  const grandTotal = subtotal + deliveryFee + taxes;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
        // Show an alert or toast
        console.warn("Cart is empty. Cannot proceed to checkout.");
        return;
    }
    console.log('Proceeding to checkout with items:', cartItems, 'Instructions:', specialInstructions, 'Promo:', promoCode);
    navigate('/checkout');
  };
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount}/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 mr-3 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="text-2xl">Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => navigate('/discovery')}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-3"> {/* Max height for scroll */}
                    <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-start p-4 border rounded-lg shadow-sm bg-white">
                        <img src={item.imageUrl || 'https://source.unsplash.com/random/80x80?food-item'} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-md font-bold text-orange-600 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2 ml-4">
                           <div className="flex items-center border rounded">
                             <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2">-</Button>
                             <Input type="number" value={item.quantity} readOnly className="w-12 text-center h-8 border-0 focus-visible:ring-0" />
                             <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</Button>
                           </div>
                           <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                             <Trash2 className="h-4 w-4 mr-1" /> Remove
                           </Button>
                        </div>
                      </div>
                    ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special requests for the restaurant or delivery? (e.g., 'extra spicy', 'leave at door')"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky summary */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (Est.)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="pt-2">
                    <Input 
                      type="text" 
                      placeholder="Promo Code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" size="sm" className="mt-2 w-full">Apply Promo</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Delivery fees and taxes are estimates and will be finalized at checkout.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;