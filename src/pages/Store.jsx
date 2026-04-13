import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Sidebar from '../components/layout/Sidebar';
import { formatPrice, truncateText } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const Store = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch(category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products');
  const { data: categories } = useFetch('https://fakestoreapi.com/products/categories');
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
    <div className="text-red-500 text-center py-16">
      <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
      <p>Please try again later.</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white">Our Store</h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Sidebar categories={categories || []} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <Link to={`/product/${product.id}`} className="block mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-40 sm:h-48 object-contain p-2 hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-white flex-grow">{truncateText(product.title, 40)}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{formatPrice(product.price)}</p>
                  <div className="flex gap-2 mt-auto">
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button className="w-full text-sm sm:text-base py-2">View</Button>
                    </Link>
                    <Button onClick={() => addToCart(product)} className="flex-1 text-sm sm:text-base py-2">Add</Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;