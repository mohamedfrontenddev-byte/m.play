import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatPrice, truncateText } from '../utils/helpers';

const Home = () => {
  const { data: products, loading, error } = useFetch('https://dummyjson.com/products?limit=20');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    }
  }, [products]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="text-red-500 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Error Loading Products</h2>
        <p className="text-sm sm:text-base">Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">Welcome to Our Store</h1>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl mx-auto text-blue-100">Discover amazing products at great prices</p>
          <Link to="/store">
            <Button variant="secondary" className="text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-semibold">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Preview - Horizontal Scroll on Mobile */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Browse by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {['smartphones', 'laptops', 'skincare', 'groceries'].map(cat => (
              <Link key={cat} to={`/store/${cat}`} className="flex-shrink-0">
                <div className="px-5 py-4 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer text-center min-w-[140px] sm:min-w-0">
                  <p className="font-semibold text-gray-700 dark:text-gray-200 text-xs sm:text-sm capitalize">{cat}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200 flex flex-col h-full overflow-hidden pb-3">
                <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50 dark:bg-gray-700">
                  <img 
                    src={product.thumbnail || product.image} 
                    alt={product.title} 
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                <div className="p-2 sm:p-3 flex flex-col flex-grow">
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 text-gray-800 dark:text-white line-clamp-2">{truncateText(product.title, 45)}</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-blue-600 dark:text-blue-400 mt-auto">{formatPrice(product.price)}</p>
                  <Link to={`/product/${product.id}`} className="mt-2">
                    <Button className="w-full text-xs sm:text-sm py-1.5 sm:py-2">View</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-5 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="text-3xl sm:text-4xl mb-3">🚚</div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-1">Free Shipping</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">On orders over $50</p>
            </div>
            <div className="text-center p-5 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="text-3xl sm:text-4xl mb-3">💳</div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-1">Secure Payment</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">100% secure transactions</p>
            </div>
            <div className="text-center p-5 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="text-3xl sm:text-4xl mb-3">🔄</div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-1">Easy Returns</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;