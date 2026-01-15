export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

// --- ЗАВАНТАЖЕННЯ ТОВАРІВ (для роботи сортування і пошуку) ---
export const fetchProducts = (params = {}) => {
    return async (dispatch) => {
        try {
            // Перетворюємо параметри { _sort: 'price', q: '...' } у рядок запиту
            const queryString = new URLSearchParams(params).toString();
            
            const response = await fetch(`http://localhost:3000/products?${queryString}`);
            if (!response.ok) {
                throw new Error('Помилка завантаження даних');
            }
            const data = await response.json();

            dispatch({
                type: SET_PRODUCTS,
                payload: data
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
};

// --- КОШИК (з підтримкою об'єму та динамічної ціни) ---
export const addToCart = (product, volume_ml, finalPrice) => ({ 
    type: ADD_TO_CART,
    payload: {
        ...product,
        // Записуємо ціну, яку порахували на фронтенді (напр. подвійну для 100 мл)
        price: finalPrice,
        // Унікальний ID: "id-об'єм" (щоб 50мл і 100мл були різними пунктами в кошику)
        uniqueId: `${product.id}-${volume_ml}`,
        volume_ml: volume_ml, 
    },
});

export const removeFromCart = (uniqueId) => ({ 
    type: REMOVE_FROM_CART,
    payload: uniqueId,
});

export const incrementQuantity = (uniqueId) => ({ 
    type: INCREMENT_QUANTITY,
    payload: uniqueId,
});

export const decrementQuantity = (uniqueId) => ({ 
    type: DECREMENT_QUANTITY,
    payload: uniqueId,
});