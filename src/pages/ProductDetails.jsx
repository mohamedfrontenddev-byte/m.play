import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { dispatch } = useCart();

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-16">
      <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
      <p>Please try again later.</p>
    </div>
  );

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm sm:text-base font-medium flex items-center gap-2"
      >
        ← Back
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 sm:p-8">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-w-sm h-auto object-contain rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">{product.title}</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
              {product.category}
            </span>
          </div>

          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 sm:py-6">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <Button 
              onClick={addToCart} 
              className="w-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              Add to Cart
            </Button>
            <Button 
              onClick={() => navigate('/store')} 
              variant="secondary"
              className="w-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;