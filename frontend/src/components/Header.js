import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between">
        <Link to="/" className="font-playfair text-2xl md:text-3xl font-semibold tracking-tight" data-testid="logo-link">
          LUMIÈRE
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              data-testid="cart-trigger"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {getTotalItems() > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-manrope font-semibold"
                  data-testid="cart-count"
                >
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="font-playfair text-2xl font-semibold" data-testid="cart-title">
                Shopping Bag
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-8 flex flex-col h-full">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="font-manrope text-muted-foreground" data-testid="empty-cart-message">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-32 object-cover bg-secondary"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-manrope font-medium text-sm">{item.name}</h3>
                            <p className="font-manrope text-sm text-muted-foreground mt-1">
                              ${item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              data-testid={`decrease-quantity-${item.id}`}
                            >
                              -
                            </button>
                            <span className="font-manrope text-sm w-8 text-center" data-testid={`quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              data-testid={`increase-quantity-${item.id}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="self-start hover:text-destructive transition-colors"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border pt-6 mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-manrope text-sm uppercase tracking-wider">Total</span>
                      <span className="font-playfair text-2xl font-semibold" data-testid="cart-total">
                        ${getTotalPrice()}
                      </span>
                    </div>
                    <Link to="/checkout" onClick={() => setIsOpen(false)}>
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full text-sm uppercase tracking-widest font-semibold font-manrope"
                        data-testid="checkout-button"
                      >
                        Checkout
                      </Button>
                    </Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline"
                        className="w-full h-12 rounded-full text-sm uppercase tracking-widest font-medium font-manrope"
                        data-testid="view-cart-button"
                      >
                        View Cart
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
