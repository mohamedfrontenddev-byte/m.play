const API_BASE_URL = 'https://dummyjson.com';

export const api = {
  getProducts: () => fetch(`${API_BASE_URL}/products`),
  getProduct: (id) => fetch(`${API_BASE_URL}/products/${id}`),
  getCategories: () => fetch(`${API_BASE_URL}/products/categories`),
  getProductsByCategory: (category) => fetch(`${API_BASE_URL}/products/category/${category}`),
};