import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
  };

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="text-center py-12 px-4 min-h-[60vh] flex flex-col justify-center">
        <div className="max-w-sm mx-auto">
          <svg className="mx-auto h-20 w-20 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add some products before checking out!</p>
          <Button onClick={() => navigate('/store')} className="px-6 py-3">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">Checkout</h1>
      
      {/* Mobile: Stacked Layout */}
      <div className="space-y-4 sm:space-y-6">
        {/* Order Summary */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h2>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex-1 min-w-0 mr-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-white whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </Card>

        {/* Shipping & Payment Form */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-white">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <Input 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <Input 
                  name="address" 
                  placeholder="123 Main St, City, Country" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Payment Details</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                  <Input 
                    name="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    value={formData.cardNumber} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry</label>
                    <Input 
                      name="expiry" 
                      placeholder="MM/YY" 
                      value={formData.expiry} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                    <Input 
                      name="cvv" 
                      placeholder="123" 
                      value={formData.cvv} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 sm:py-4 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;