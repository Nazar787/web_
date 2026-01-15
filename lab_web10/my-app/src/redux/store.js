import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Зверни увагу на фігурні дужки!
import rootReducer from './reducer';

// Це потрібно для роботи Redux DevTools у браузері (щоб ти бачив стан)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Створюємо стор з підтримкою thunk
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;