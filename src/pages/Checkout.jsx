import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatPrice } from '../utils/helpers';

const Checkout = () => {
  const { cart, totalPrice, dispatch } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, process payment and order
    alert('Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Order Summary</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-blue-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Shipping & Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Shipping Details</h3>
                <div className="space-y-4">
                  <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                  <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                  <Input name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Payment Information</h3>
                <div className="space-y-4">
                  <Input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                    <Input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full py-3 text-lg">Place Order</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;