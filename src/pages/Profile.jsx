import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
        <p className="text-gray-600">You need to be logged in to access this page.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Profile</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <p className="text-gray-800 dark:text-white">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <p className="text-gray-800 dark:text-white">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <Button onClick={logout} variant="danger" className="px-6 py-2">Logout</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;