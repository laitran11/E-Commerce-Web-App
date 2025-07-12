import api from "../api";

export const getCategoryParent = async () => {
    return await api.get('/api/categories/parent/null/');
}
export const createCategory = async (categoryData) => {
    return await api.post('/api/catgories/');
}
export const getCategoryByParentId = async (id) =>{
    return await api.get(`/api/categories/parent/${id}`)
}