import { createStore } from 'redux';
import cartReducer from './reducer';

// 1. Функція для завантаження збереженого кошика
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('scentoriaCart');
    if (serializedState === null) {
      return undefined; // Якщо нічого не збережено, Redux візьме пустий масив
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Функція для запису кошика в пам'ять
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('scentoriaCart', serializedState);
  } catch (err) {
    // Ігноруємо помилки запису
  }
};

// 3. Завантажуємо дані перед створенням Store
const persistedState = loadState();

// 4. Створюємо Store з відновленими даними
const store = createStore(
  cartReducer,
  persistedState
);

// 5. Слухаємо будь-які зміни в Store і одразу зберігаємо їх
store.subscribe(() => {
  saveState({
    cartItems: store.getState().cartItems
  });
});

export default store;