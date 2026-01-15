import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  INCREMENT_QUANTITY, 
  DECREMENT_QUANTITY 
} from './actions';

// Функція для завантаження стану з браузерного сховища
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const persistedState = loadState();

const initialState = persistedState ? persistedState : { // Завантажуємо збережений стан
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const uniqueId = action.payload.uniqueId;
            const existingItem = state.cartItems.find(item => item.uniqueId === uniqueId); // Пошук за uniqueId

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.uniqueId === uniqueId // Порівняння за uniqueId
                            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                };
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.uniqueId !== action.payload), // Фільтрація за uniqueId
            };

        case INCREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.uniqueId === action.payload // Оновлення за uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case DECREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.uniqueId === action.payload // Оновлення за uniqueId
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item
                ),
            };

        default:
            return state;
    }
};

export default cartReducer;