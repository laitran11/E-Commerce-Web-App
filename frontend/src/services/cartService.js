import api from "../api";

export const createCart = async ( product_id, quantity = 1, price) =>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    try {
        const response = await api.post(
            '/api/cart/',{
                product_id,
                quantity,
                price
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
    catch(error) {
        console.error("Error creating cart item", error.response?.data || error.message);
        throw error;
    }

}
export const getCartItems = async () =>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    try{
        const response = await api.get(
            '/api/cart/',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
    catch(err) {
        console.error("Error fetching cart item", err.message);
        throw err;
    }
}