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
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="max-w-md mx-auto px-4">
          <svg className="mx-auto h-20 sm:h-24 w-20 sm:w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">Add some products to get started!</p>
          <Link to="/store">
            <Button className="px-6 sm:px-8 py-2 sm:py-3">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white">Shopping Cart</h1>
      <div className="space-y-4 sm:space-y-6">
        {cart.map(item => (
          <Card key={item.id} className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <img src={item.image} alt={item.title} className="w-16 sm:w-20 h-16 sm:h-20 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 p-2" />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(item.price)}</p>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} variant="secondary" className="px-2 py-1 text-sm">−</Button>
                  <span className="px-3 py-1 font-semibold text-center min-w-[40px]">{item.quantity}</span>
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} variant="secondary" className="px-2 py-1 text-sm">+</Button>
                </div>
                <Button onClick={() => removeItem(item.id)} variant="danger" className="px-3 sm:px-4 py-1 sm:py-2 text-sm">Remove</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8 sm:mt-10 lg:mt-12 bg-gradient-to-br from-blue-50 dark:from-gray-800 to-purple-50 dark:to-gray-700 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <span className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Total:</span>
          <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(totalPrice)}</span>
        </div>
        <div className="text-center sm:text-right">
          <Link to="/checkout" className="inline-block">
            <Button className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;