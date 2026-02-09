import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-manrope text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-manrope text-sm hover:text-muted-foreground transition-colors mb-12"
          data-testid="back-to-products"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24" data-testid="product-details">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="product-image"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="font-manrope text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-4">
                {product.category}
              </p>
              <h1 className="font-playfair text-3xl md:text-5xl font-medium tracking-tight mb-6" data-testid="product-detail-name">
                {product.name}
              </h1>
              <p className="font-playfair text-4xl font-semibold mb-8" data-testid="product-detail-price">
                ${product.price}
              </p>
              <p className="font-manrope text-base font-normal leading-relaxed text-muted-foreground" data-testid="product-description">
                {product.description}
              </p>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-full text-sm uppercase tracking-widest font-semibold transition-transform active:scale-95"
              data-testid="add-to-cart-detail"
            >
              Add to Cart
            </Button>

            <div className="border-t border-border pt-8 space-y-4">
              <div className="flex justify-between font-manrope text-sm">
                <span className="text-muted-foreground">Free Shipping</span>
                <span>On orders over $100</span>
              </div>
              <div className="flex justify-between font-manrope text-sm">
                <span className="text-muted-foreground">Returns</span>
                <span>30 days return policy</span>
              </div>
              <div className="flex justify-between font-manrope text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>5-7 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
