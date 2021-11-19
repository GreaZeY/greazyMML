import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { getFavoritesReducer, movieDetailsReducer, movieReducer } from "./reducers/movieReducer";
import { userReducer,profileReducer, forgotPasswordReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    movies:movieReducer,
    movieDetails:movieDetailsReducer,
    user:userReducer,
    profile: profileReducer,
    forgotPassword:forgotPasswordReducer,
    UserFavList:getFavoritesReducer,

    
});
 let initialState = {};
 const middleware = [thunk];
 const store = createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
 )

 export default store;