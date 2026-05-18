import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { getRandomItems, formatPrice, truncateText } from '../utils/helpers';

const Home = () => {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFeaturedProducts(getRandomItems(products, 4));
    }
  }, [products]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 text-center">
        <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
        <p>Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-12 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">Welcome to Our Store</h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100">Discover amazing products at great prices with our modern e-commerce experience</p>
          <Link to="/store">
            <Button variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">Shop Now</Button>
          </Link>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-800 dark:text-white">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {['Electronics', 'Jewelery', 'Men\'s Clothing', 'Women\'s Clothing'].map(cat => (
              <Link key={cat} to={`/store/${cat.toLowerCase()}`}>
                <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-blue-50 dark:from-gray-800 to-purple-50 dark:to-gray-700 hover:shadow-lg transition-shadow cursor-pointer text-center">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">{cat}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-800 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div className="relative w-full h-40 sm:h-48 mb-4 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-white flex-grow">{truncateText(product.title, 40)}</h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-auto">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button className="w-full text-sm sm:text-base py-2">View</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard icon="🚚" title="Free Shipping" description="On orders over $50" />
            <FeatureCard icon="💳" title="Secure Payment" description="100% secure transactions" />
            <FeatureCard icon="🔄" title="Easy Returns" description="30-day return policy" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 sm:p-8 rounded-lg bg-gray-50 dark:bg-gray-700">
    <div className="text-4xl sm:text-5xl mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);