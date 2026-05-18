import { useCart } from '../context/CartContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch, totalPrice } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 px-4 min-h-[60vh] flex flex-col justify-center">
        <div className="max-w-sm mx-auto">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z" />
          </svg>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add some products to get started!</p>
          <Link to="/store">
            <Button className="w-full sm:w-auto px-8 py-3">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">Shopping Cart ({cart.length})</h1>
      
      {/* Cart Items */}
      <div className="space-y-3 sm:space-y-4 mb-4">
        {cart.map(item => (
          <Card key={item.id} className="p-3 sm:p-4">
            <div className="flex gap-3 sm:gap-4">
              {/* Product Image */}
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img 
                  src={item.thumbnail || item.image} 
                  alt={item.title} 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-50 dark:bg-gray-700" 
                />
              </Link>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="block">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                  {formatPrice(item.price * item.quantity)}
                </p>
                
                {/* Quantity & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 safe-bottom">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{formatPrice(totalPrice)}</span>
          </div>
          <Link to="/checkout" className="block">
            <Button className="w-full py-3 sm:py-4 text-base font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;