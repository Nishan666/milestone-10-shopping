export const fetchCategoriesFromAPI = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  };