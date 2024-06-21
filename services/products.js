export const fetchProductsFromAPI = async (offset) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=20`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };