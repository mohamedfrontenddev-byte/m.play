const Sidebar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        {categories?.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category 
                ? 'bg-blue-500 text-white' 
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