export const fetchProductById = async (id) => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    if (!response.ok) {
      console.error("Network response was not ok");
      return null; 
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }
};
