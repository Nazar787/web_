import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export const getProducts = async (params = {}) => {
    try {
        console.log("[API] Надсилаю запит до:", `${API_URL}/products`, params);
        
        const response = await axios.get(`${API_URL}/products`, {
            params: params 
        });
        
        console.log("[API] Отримано відповідь від axios:", response);

        if (response && response.data) {
            return response.data;
        } else {
            console.error("[API] Axios не повернув data!");
            return []; 
        }

    } catch (error) {
        console.error("[API] Помилка запиту:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Помилка при отриманні товару з ID ${id}:`, error);
        throw error;
    }
};