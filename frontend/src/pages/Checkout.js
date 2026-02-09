import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock order submission
    toast.success('Order placed successfully!');
    clearCart();
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="font-playfair text-3xl md:text-5xl font-medium">
            Your cart is empty
          </h2>
          <Button 
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full text-sm uppercase tracking-widest font-semibold"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="font-playfair text-3xl md:text-5xl font-medium tracking-tight mb-12" data-testid="checkout-title">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8" data-testid="checkout-form">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-medium">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-manrope text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                      data-testid="first-name-input"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-manrope text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                      data-testid="last-name-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-manrope text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                    data-testid="email-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-manrope text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                    data-testid="phone-input"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-6 border-t border-border pt-8">
                <h2 className="font-playfair text-2xl font-medium">Shipping Address</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="font-manrope text-sm font-medium">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                    data-testid="address-input"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-manrope text-sm font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                      data-testid="city-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state" className="font-manrope text-sm font-medium">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                      data-testid="state-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="font-manrope text-sm font-medium">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="h-12 rounded-none border-b border-input bg-transparent focus-visible:border-primary"
                      data-testid="zip-input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-full text-sm uppercase tracking-widest font-semibold transition-transform active:scale-95 mt-8"
                data-testid="place-order-button"
              >
                Place Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-8 space-y-6 sticky top-24">
              <h2 className="font-playfair text-2xl font-medium" data-testid="checkout-summary-title">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4" data-testid={`checkout-item-${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-manrope text-sm font-medium">{item.name}</p>
                      <p className="font-manrope text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-manrope text-sm font-medium">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between font-manrope text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="checkout-subtotal">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between font-manrope text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-playfair text-xl font-semibold border-t border-border pt-4">
                  <span>Total</span>
                  <span data-testid="checkout-total">${getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
