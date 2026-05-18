import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  const { dispatch } = useCart();

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-12 px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Error Loading Product</h2>
      <p className="text-sm sm:text-base">Please try again later.</p>
    </div>
  );

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
      >
        ← Back
      </button>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Image Section - Square aspect ratio for mobile */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
          <img 
            src={product.thumbnail || product.images?.[0] || product.image} 
            alt={product.title} 
            className="w-full aspect-square object-cover"
          />
          {/* Thumbnail gallery if available */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-4 sm:space-y-5">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30">
              {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                ⭐ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </p>
            {product.discountPercentage && (
              <span className="text-sm sm:text-base font-medium text-red-500 line-through">
                {formatPrice(product.price / (1 - product.discountPercentage / 100))}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Stock Badge */}
          {product.stock && (
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              product.stock > 10 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : product.stock > 0
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚠ Only ${product.stock} left` : '✗ Out of Stock'}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-3 safe-bottom">
            <Button 
              onClick={handleAddToCart} 
              className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold"
              disabled={!product.stock}
            >
              Add to Cart
            </Button>
            <Button 
              onClick={() => navigate('/store')} 
              variant="secondary"
              className="w-full py-3 sm:py-4 text-base sm:text-lg"
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