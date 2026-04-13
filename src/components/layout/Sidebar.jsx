const Sidebar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full lg:w-64 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg rounded-lg">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-white">Categories</h3>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left p-2 sm:p-3 rounded text-sm sm:text-base transition-colors ${
            selectedCategory === '' 
              ? 'bg-blue-500 dark:bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`block w-full text-left p-2 sm:p-3 rounded text-sm sm:text-base transition-colors ${
              selectedCategory === category 
                ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;