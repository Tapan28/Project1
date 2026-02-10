import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const response = await axios.get(`${API}/products`);
        const response = await axios.get(`/products.json`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-manrope text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1764844463559-63d59516380a?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Fashion hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-playfair text-5xl md:text-7xl font-semibold tracking-tighter leading-none mb-6" data-testid="hero-title">
            Refined Essentials
          </h1>
          <p className="font-manrope text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" data-testid="hero-subtitle">
            Curated clothing for the modern minimalist
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16" data-testid="products-grid">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group"
              data-testid={`product-card-${product.id}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-2">
                <p className="font-manrope text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="font-playfair text-xl font-normal" data-testid={`product-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="font-manrope text-lg font-medium" data-testid={`product-price-${product.id}`}>
                  ${product.price}
                </p>
                
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full text-sm uppercase tracking-widest font-semibold transition-transform active:scale-95"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  Add to Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
