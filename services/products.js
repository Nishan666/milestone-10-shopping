export const fetchProductsFromAPI = async (offset, filters) => {
  const { category, title, priceRange } = filters;
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=9`;
  
  if (category) url += `&categoryId=${category}`;
  if (title) url += `&title=${title}`;
  if (priceRange.min || priceRange.max) url += `&price_min=${priceRange.min}&price_max=${priceRange.max}`;

  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
};
  