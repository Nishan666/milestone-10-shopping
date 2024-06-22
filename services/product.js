export const fetchProductById = async (id) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };