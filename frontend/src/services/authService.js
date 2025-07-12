import api from "../api";

export const login = async (username, password) =>{
    return await api.post('/auth/login/', {
        username,
        password
    });
}
export const register = async (firstname, lastname, username, email, password) =>{
    return await api.post('/auth/register/', {
        firstname,
        lastname,
        username,
        email,
        password
    });
}