import { combineReducers } from 'redux';
import { error } from './error'
import { loader } from './loader'
import { logout } from './logout'
import { reports } from './reports'
import { summary } from './summary'
import { search } from './search'
import { setHeaderNavegation } from './headerNavegation'

const appReducer = combineReducers({
    logout,
    error,
    loader, 
    reports,
    setHeaderNavegation,
    summary,
    search
});

const resetState = combineReducers({
    error,
    loader,
    reports,
    setHeaderNavegation,
    summary,
    search
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_ALL') {
        state = undefined
        return resetState(state,action)
    }else{
        return appReducer(state, action)
    }

   
}

export default rootReducer;
