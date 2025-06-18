import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderStatusTracker from '@/components/OrderStatusTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, Truck, Package, ShoppingBag, Home, MessageSquare } from 'lucide-react'; // Added icons

// Define OrderStatus type, should match the one in OrderStatusTracker if not globally defined
type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'FAILED';

const orderStatuses: OrderStatus[] = ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
const statusProgressMap: Record<OrderStatus, number> = {
    'PENDING': 0,
    'CONFIRMED': 25,
    'PREPARING': 50,
    'OUT_FOR_DELIVERY': 75,
    'DELIVERED': 100,
    'CANCELLED': 0, // Or specific UI for cancelled
    'FAILED': 0, // Or specific UI for failed
};


const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('CONFIRMED');
  const [estimatedDelivery, setEstimatedDelivery] = useState('4:30 PM - 4:45 PM'); // Mock
  const [progressValue, setProgressValue] = useState(25);

  useEffect(() => {
    console.log('OrderTrackingPage loaded for order ID:', orderId);
    // Simulate status updates
    let statusIndex = 0;
    setCurrentStatus(orderStatuses[statusIndex]);
    setProgressValue(statusProgressMap[orderStatuses[statusIndex]]);

    if (orderStatuses[statusIndex] === 'DELIVERED' || orderStatuses[statusIndex] === 'CANCELLED' || orderStatuses[statusIndex] === 'FAILED') {
        return;
    }

    const interval = setInterval(() => {
      statusIndex++;
      if (statusIndex < orderStatuses.length) {
        const newStatus = orderStatuses[statusIndex];
        setCurrentStatus(newStatus);
        setProgressValue(statusProgressMap[newStatus]);
        if (newStatus === 'DELIVERED') {
            setEstimatedDelivery('Delivered!');
            clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 15000); // Update every 15 seconds for demo

    return () => clearInterval(interval);
  }, [orderId]);
  
  const orderDetails = { // Mock
    id: orderId,
    restaurantName: 'Pizza Paradise',
    items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Coca-Cola', quantity: 2, price: 2.50 }
    ],
    totalAmount: 22.75, // Including fees & taxes
    deliveryAddress: '123 Main St, Anytown, 12345'
  };

  // Define custom steps for OrderStatusTracker if needed, matching the component's expected props
  const customSteps = [
    { status: 'CONFIRMED' as OrderStatus, label: 'Order Confirmed', Icon: CheckCircle, timestamp: currentStatus === 'CONFIRMED' ? new Date().toLocaleTimeString() : undefined },
    { status: 'PREPARING' as OrderStatus, label: 'Preparing Food', Icon: Loader2, timestamp: currentStatus === 'PREPARING' ? new Date().toLocaleTimeString() : undefined },
    { status: 'OUT_FOR_DELIVERY' as OrderStatus, label: 'Out for Delivery', Icon: Truck, timestamp: currentStatus === 'OUT_FOR_DELIVERY' ? new Date().toLocaleTimeString() : undefined },
    { status: 'DELIVERED' as OrderStatus, label: 'Delivered', Icon: Package, timestamp: currentStatus === 'DELIVERED' ? new Date().toLocaleTimeString() : undefined },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-gray-100 p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">Order Tracking</CardTitle>
                    <CardDescription>Order ID: {orderDetails.id}</CardDescription>
                </div>
                <ShoppingBag className="h-10 w-10 text-orange-500"/>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">Estimated Delivery Time</p>
                <p className="text-2xl font-bold text-orange-600">{currentStatus === 'DELIVERED' ? 'Delivered successfully!' : estimatedDelivery}</p>
            </div>
            
            <OrderStatusTracker currentStatus={currentStatus} steps={customSteps} />

            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <Progress value={progressValue} className="w-full [&>div]:bg-orange-500" />
            </div>

            <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
                <div className="text-sm text-gray-600">
                    <p><strong>Restaurant:</strong> {orderDetails.restaurantName}</p>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        {orderDetails.items.map(item => (
                            <li key={item.name}>{item.name} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}</li>
                        ))}
                    </ul>
                    <p className="mt-2"><strong>Total:</strong> <span className="font-bold">${orderDetails.totalAmount.toFixed(2)}</span></p>
                    <p className="mt-2"><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
                </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-50 rounded-b-lg space-y-3 sm:space-y-0">
            <Button variant="outline" onClick={() => navigate('/contact-support')}> {/* Assume a contact page */}
                <MessageSquare className="mr-2 h-4 w-4"/> Contact Support
            </Button>
            <Button onClick={() => navigate('/discovery')}>
                <Home className="mr-2 h-4 w-4"/> Order Again / New Order
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;