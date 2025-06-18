import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form"; // Assuming shadcn form setup
import AddressSelectionCard from '@/components/AddressSelectionCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from '@/components/ui/separator';
import { CreditCard, MapPin, PlusCircle, ShieldCheck } from 'lucide-react';

// Mock data
const mockAddresses = [
  { id: 'addr1', type: 'Home', line1: '123 Main St', city: 'Anytown', postalCode: '12345', isDefault: true },
  { id: 'addr2', type: 'Work', line1: '456 Office Ave', line2: 'Suite 100', city: 'Anytown', postalCode: '12346' },
];

const mockPaymentMethods = [
    { id: 'pay1', type: 'Visa', last4: '1234', expiry: '12/25' },
    { id: 'pay2', type: 'Mastercard', last4: '5678', expiry: '10/26' },
];

const checkoutFormSchema = z.object({
  selectedAddress: z.string().min(1, "Please select a delivery address."),
  paymentMethod: z.string().min(1, "Please select a payment method."),
  // Fields for new card if "add new" is selected
  newCardName: z.string().optional(),
  newCardNumber: z.string().optional(), // Add more specific validation (e.g., Luhn algorithm)
  newCardExpiry: z.string().optional(), // MM/YY
  newCardCvc: z.string().optional(), // 3-4 digits
  promoCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// This is a mock cart total from previous page
const MOCK_ORDER_TOTAL = 55.75; 

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(mockAddresses.find(a => a.isDefault)?.id || '');
  const [paymentMethods] = useState(mockPaymentMethods);
  const [selectedPaymentId, setSelectedPaymentId] = useState(mockPaymentMethods[0]?.id || '');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      selectedAddress: selectedAddressId,
      paymentMethod: selectedPaymentId,
    },
  });

  useEffect(() => {
    console.log('CheckoutPage loaded');
    // Pre-fill form if default values change
    form.setValue('selectedAddress', selectedAddressId);
    form.setValue('paymentMethod', selectedPaymentId);
  }, [selectedAddressId, selectedPaymentId, form]);


  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout submitted:', data);
    // Simulate order placement
    // For now, navigate to a mock order tracking page
    const mockOrderId = `ORD${Date.now()}`;
    navigate(`/orders/${mockOrderId}/track`);
  };

  const handleAddNewAddress = () => {
    setShowNewAddressForm(true);
    // In a real app, this might open a modal or a separate form
    // For this example, we'll just log it.
    console.log("User wants to add new address");
  };

  const handleAddNewPayment = () => {
    setShowNewPaymentForm(true);
    setSelectedPaymentId('new'); // Indicate new payment form is active
    form.setValue('paymentMethod', 'new');
    console.log("User wants to add new payment method");
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header cartItemCount={0} /> {/* Assuming cart count is handled elsewhere or not shown here */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Address & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><MapPin className="h-6 w-6 mr-2 text-orange-600" /> Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="selectedAddress"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedAddressId(value);
                            setShowNewAddressForm(false);
                          }}
                          value={field.value}
                          className="space-y-4"
                        >
                          {addresses.map(addr => (
                            <FormItem key={addr.id} className="w-full">
                              <FormControl>
                                <AddressSelectionCard
                                  address={addr}
                                  isSelected={field.value === addr.id}
                                  onSelect={() => {
                                     field.onChange(addr.id);
                                     setSelectedAddressId(addr.id);
                                     setShowNewAddressForm(false);
                                  }}
                                  // onEdit, onDelete could be implemented later
                                />
                              </FormControl>
                            </FormItem>
                          ))}
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant="outline" className="mt-4 w-full" onClick={handleAddNewAddress}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
                  {showNewAddressForm && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-3">
                      <h3 className="font-semibold">Add New Address</h3>
                      <Input placeholder="Full Name" />
                      <Input placeholder="Address Line 1" />
                      <Input placeholder="Address Line 2 (Optional)" />
                      <Input placeholder="City" />
                      <Input placeholder="Postal Code" />
                      <Button size="sm" onClick={() => setShowNewAddressForm(false)}>Save Address</Button> {/* Mock save */}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="h-6 w-6 mr-2 text-orange-600" /> Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                         <RadioGroup
                            onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedPaymentId(value);
                                setShowNewPaymentForm(value === 'new');
                            }}
                            value={field.value}
                            className="space-y-3"
                        >
                            {paymentMethods.map(pm => (
                                <FormItem key={pm.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                                    <FormControl>
                                        <RadioGroupItem value={pm.id} id={`payment-${pm.id}`} />
                                    </FormControl>
                                    <FormLabel htmlFor={`payment-${pm.id}`} className="font-normal cursor-pointer flex-grow">
                                        {pm.type} ending in **** {pm.last4} (Expires {pm.expiry})
                                    </FormLabel>
                                </FormItem>
                            ))}
                             <FormItem className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                                <FormControl>
                                    <RadioGroupItem value="new" id="payment-new" />
                                </FormControl>
                                <FormLabel htmlFor="payment-new" className="font-normal cursor-pointer flex-grow flex items-center">
                                    <PlusCircle className="h-4 w-4 mr-2"/> Add New Card
                                </FormLabel>
                            </FormItem>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {showNewPaymentForm && (
                     <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4">
                        <h3 className="font-semibold text-lg mb-2">Enter New Card Details</h3>
                        <FormField control={form.control} name="newCardName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl><Input {...field} placeholder="John Doe" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="newCardNumber" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl><Input {...field} placeholder="•••• •••• •••• ••••" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="newCardExpiry" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiry Date (MM/YY)</FormLabel>
                                    <FormControl><Input {...field} placeholder="MM/YY" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="newCardCvc" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl><Input {...field} placeholder="•••" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        {/* <Button size="sm" className="mt-2" onClick={() => setShowNewPaymentForm(false)}>Save Card</Button> */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Mock summary items - in a real app, these would be from cart state */}
                  <div className="flex justify-between"><span>Margherita Pizza x 1</span><span>$12.99</span></div>
                  <div className="flex justify-between"><span>Coca-Cola x 2</span><span>$5.00</span></div>
                  <Separator/>
                  <div className="flex justify-between"><span>Subtotal</span><span>$17.99</span></div>
                  <div className="flex justify-between"><span>Delivery Fee</span><span>$5.00</span></div>
                  <div className="flex justify-between"><span>Taxes</span><span>$2.76</span></div>
                  <Separator/>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${MOCK_ORDER_TOTAL.toFixed(2)}</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="promoCode"
                    render={({ field }) => (
                      <FormItem className="pt-2">
                        <FormLabel>Promo Code</FormLabel>
                        <FormControl><Input {...field} placeholder="Enter code" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button variant="outline" size="sm" className="w-full mt-1">Apply Promo</Button>
                </CardContent>
                <CardFooter className="flex-col space-y-3">
                    <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                        Place Order (${MOCK_ORDER_TOTAL.toFixed(2)})
                    </Button>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                        <ShieldCheck className="h-3 w-3 mr-1 text-green-600"/> Secure SSL Encryption
                    </p>
                </CardFooter>
              </Card>
              <Alert variant="default" className="mt-6">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <AlertTitle>Secure Checkout</AlertTitle>
                <AlertDescription>
                  Your payment information is processed securely.
                </AlertDescription>
              </Alert>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;