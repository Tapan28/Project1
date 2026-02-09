import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="font-playfair text-3xl md:text-5xl font-medium" data-testid="empty-cart-title">
            Your cart is empty
          </h2>
          <Link to="/">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full text-sm uppercase tracking-widest font-semibold"
              data-testid="continue-shopping"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-manrope text-sm hover:text-muted-foreground transition-colors mb-12"
          data-testid="back-to-shopping"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Continue Shopping
        </Link>

        <h1 className="font-playfair text-3xl md:text-5xl font-medium tracking-tight mb-12" data-testid="cart-page-title">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-6 pb-8 border-b border-border"
                data-testid={`cart-page-item-${item.id}`}
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-40 object-cover bg-secondary hover:opacity-90 transition-opacity"
                  />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-playfair text-xl font-normal hover:text-muted-foreground transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-manrope text-sm text-muted-foreground mt-1">
                      {item.category}
                    </p>
                    <p className="font-manrope text-lg font-medium mt-3" data-testid={`cart-item-price-${item.id}`}>
                      ${item.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        data-testid={`cart-decrease-${item.id}`}
                      >
                        -
                      </button>
                      <span className="font-manrope text-base w-10 text-center" data-testid={`cart-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        data-testid={`cart-increase-${item.id}`}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto hover:text-destructive transition-colors flex items-center gap-2 font-manrope text-sm"
                      data-testid={`cart-remove-${item.id}`}
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-manrope text-lg font-medium" data-testid={`cart-item-total-${item.id}`}>
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-8 space-y-6 sticky top-24">
              <h2 className="font-playfair text-2xl font-medium" data-testid="order-summary-title">
                Order Summary
              </h2>
              
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between font-manrope text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="cart-subtotal">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between font-manrope text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-playfair text-xl font-semibold border-t border-border pt-4">
                  <span>Total</span>
                  <span data-testid="cart-page-total">${getTotalPrice()}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-full text-sm uppercase tracking-widest font-semibold transition-transform active:scale-95"
                  data-testid="proceed-to-checkout"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
