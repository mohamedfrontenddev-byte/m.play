import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, call API
    login({ name: 'User', email: formData.email }, 'token123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <Button type="submit" className="w-full py-3">Login</Button>
        </form>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;