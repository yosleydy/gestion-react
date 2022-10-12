import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import reducers from './../reducers'

const initialState = {
    customer: '',
    showCustomer: false,
    customers: [],
    representants: [],
    instanceType: [],
}

export const store = createStore(reducers,initialState,applyMiddleware(thunk));