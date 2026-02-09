from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Product(BaseModel):
    id: int
    name: str
    price: int
    category: str
    image: str
    description: str = ""


# Mock product data
PRODUCTS = [
    {
        "id": 1,
        "name": "Oversized Structure Blazer",
        "price": 189,
        "category": "Outerwear",
        "image": "https://images.unsplash.com/photo-1737540995419-21ed4ded15a6?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "A contemporary take on tailoring with exaggerated shoulders and a relaxed silhouette. Perfect for both professional and casual settings."
    },
    {
        "id": 2,
        "name": "Essential Cotton Sweatshirt",
        "price": 85,
        "category": "Tops",
        "image": "https://images.unsplash.com/photo-1693901257178-b5fcb8f036a8?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Soft, breathable cotton in a classic fit. Your everyday essential for effortless style and comfort."
    },
    {
        "id": 3,
        "name": "Tailored Wool Coat",
        "price": 245,
        "category": "Outerwear",
        "image": "https://images.unsplash.com/photo-1737540995958-1b1b3efd391f?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Premium wool blend with impeccable tailoring. A timeless investment piece for the modern wardrobe."
    },
    {
        "id": 4,
        "name": "Noir Leather Jacket",
        "price": 320,
        "category": "Outerwear",
        "image": "https://images.unsplash.com/photo-1616404662085-b81be2812cf2?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Genuine leather with a sleek, minimalist design. Crafted to develop character over time while maintaining its sophisticated edge."
    },
    {
        "id": 5,
        "name": "Winter Trench Coat",
        "price": 210,
        "category": "Outerwear",
        "image": "https://images.unsplash.com/photo-1632149877166-f75d49000351?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Classic trench styling with modern proportions. Water-resistant fabric meets timeless design for unpredictable weather."
    },
    {
        "id": 6,
        "name": "Signature White Suit",
        "price": 299,
        "category": "Suits",
        "image": "https://images.unsplash.com/photo-1746864946956-0c047289abaf?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "A statement piece in pristine white. Impeccably tailored for those who dare to stand out with understated elegance."
    },
    {
        "id": 7,
        "name": "Silk Evening Dress",
        "price": 180,
        "category": "Dresses",
        "image": "https://images.unsplash.com/photo-1641840007671-06412f440b65?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Luxurious silk that drapes beautifully. Designed for special occasions with a minimalist aesthetic that lets the fabric speak."
    },
    {
        "id": 8,
        "name": "Everyday Tote",
        "price": 120,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Spacious and structured with clean lines. The perfect companion for work, travel, and everything in between."
    }
]


# Routes
@api_router.get("/")
async def root():
    return {"message": "LUMIÈRE E-Commerce API"}


@api_router.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    return PRODUCTS


@api_router.get("/products/{product_id}")
async def get_product(product_id: int):
    """Get a single product by ID"""
    from fastapi import HTTPException
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
