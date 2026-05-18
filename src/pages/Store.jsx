import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatPrice, truncateText } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const Store = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch(category ? `https://dummyjson.com/products/category/${category}` : 'https://dummyjson.com/products');
  const { data: categories } = useFetch('https://dummyjson.com/products/category-list');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    setSelectedCategory(category || '');
  }, [category]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [products, searchTerm]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    navigate(cat ? `/store/${cat}` : '/store');
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-16 px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Error Loading Products</h2>
      <p className="text-sm sm:text-base">Please try again later.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">Our Store</h1>
      
      {/* Mobile Categories - Horizontal Scroll */}
      <div className="mb-4 overflow-x-auto -mx-3 px-3 scrollbar-hide">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            All
          </button>
          {categories?.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 text-sm"
        />
      </div>

      {/* Products Grid - Mobile 2 columns, tablet 2-3, desktop 3 */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200 flex flex-col h-full overflow-hidden">
              <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50 dark:bg-gray-700">
                <img 
                  src={product.thumbnail || product.image} 
                  alt={product.title} 
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </Link>
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-xs sm:text-sm font-semibold mb-1 text-gray-800 dark:text-white line-clamp-2">{truncateText(product.title, 50)}</h3>
                <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mb-2 mt-auto">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-auto">
                  <Button onClick={() => addToCart(product)} className="flex-1 text-xs sm:text-sm py-2 px-2">
                    Add
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-xs sm:text-sm py-2 px-2">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Store;