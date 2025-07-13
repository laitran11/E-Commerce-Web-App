import api from "../api";

export const getCategoryParent = async () => {
    return await api.get('/api/category/parent/null/');
}
export const createCategory = async (categoryData) => {
    return await api.post('/api/catgory/');
}
export const getCategoryByParentId = async (id) =>{
    return await api.get(`/api/category/parent/${id}`)
}