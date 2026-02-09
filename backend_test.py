import requests
import sys
from datetime import datetime

class ECommerceAPITester:
    def __init__(self, base_url="https://ecom-react-demo.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, expected_count=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Additional validation for products endpoint
                if endpoint == "api/products" and expected_count:
                    data = response.json()
                    if len(data) == expected_count:
                        print(f"✅ Product count validation passed: {len(data)} products")
                        return True, data
                    else:
                        print(f"❌ Product count mismatch: expected {expected_count}, got {len(data)}")
                        self.failed_tests.append(f"{name} - Product count mismatch")
                        return False, data
                
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                self.failed_tests.append(f"{name} - Status code {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name} - Exception: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "api/", 200)

    def test_get_all_products(self):
        """Test getting all products - should return 8 clothing items"""
        success, products = self.run_test("Get All Products", "GET", "api/products", 200, expected_count=8)
        
        if success and products:
            print(f"📦 Products found:")
            for product in products:
                print(f"  - ID: {product.get('id')}, Name: {product.get('name')}, Price: ${product.get('price')}, Category: {product.get('category')}")
        
        return success, products

    def test_get_single_product(self, product_id=1):
        """Test getting a single product by ID"""
        success, product = self.run_test(f"Get Product {product_id}", "GET", f"api/products/{product_id}", 200)
        
        if success and product:
            print(f"📦 Product details:")
            print(f"  - ID: {product.get('id')}")
            print(f"  - Name: {product.get('name')}")
            print(f"  - Price: ${product.get('price')}")
            print(f"  - Category: {product.get('category')}")
            print(f"  - Description: {product.get('description', 'N/A')}")
        
        return success, product

    def test_invalid_product(self):
        """Test getting a non-existent product"""
        return self.run_test("Get Invalid Product", "GET", "api/products/999", 200)  # API returns 200 with error message

def main():
    print("🚀 Starting E-Commerce API Tests")
    print("=" * 50)
    
    # Setup
    tester = ECommerceAPITester()

    # Test API root
    tester.test_api_root()

    # Test products endpoints
    success, products = tester.test_get_all_products()
    
    if success and products:
        # Test individual product retrieval
        tester.test_get_single_product(1)
        tester.test_get_single_product(8)  # Last product
        
        # Test invalid product
        tester.test_invalid_product()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed_test in tester.failed_tests:
            print(f"  - {failed_test}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())