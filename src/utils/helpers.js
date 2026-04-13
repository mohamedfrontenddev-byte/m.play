export const formatPrice = (price) => `$${price.toFixed(2)}`;

export const truncateText = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

export const getRandomItems = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};