import api from "../api";

// export const getProducts = async (page, pageSize, field,name,minPrice,maxPrice) => {
//     return await api.get(`/api/products/?page=${page}&page_size=${pageSize}&sort=${field}&name=${name}&min_price=${minPrice}&max_price=${maxPrice}`);
// }
export const getProducts = async (page, pageSize, field, name, minPrice, maxPrice,categoryId) => {
    const params = new URLSearchParams();
  
    if (page) params.append('page', page);
    if (pageSize) params.append('page_size', pageSize);
    if (field) params.append('sort', field);
    if (name) params.append('name', name);
    if (categoryId) params.append('category_id', categoryId);
    if (minPrice !== undefined && minPrice !== null) params.append('min_price', minPrice);
    if (maxPrice !== undefined && maxPrice !== null) params.append('max_price', maxPrice);
  
    const queryString = params.toString();
  
    return await api.get(`/api/products/?${queryString}`);
  }
  
export const getProductDetail = async (product_id) =>{
    return await api.get(`/api/products/${product_id}/`)
}