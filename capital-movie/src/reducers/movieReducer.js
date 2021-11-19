import { 
    DISCOVER_FAIL, 
    DISCOVER_REQUEST, 
    DISCOVER_SUCCESS, 
    POPULAR_FAIL, 
    POPULAR_REQUEST, 
    POPULAR_SUCCESS, 
    LATEST_FAIL, 
    LATEST_REQUEST, 
    LATEST_SUCCESS, 
    SEARCH_FAIL, 
    SEARCH_REQUEST, 
    SEARCH_SUCCESS, 
    FAVORITES_FAIL, 
    FAVORITES_REQUEST, 
    FAVORITES_SUCCESS, 
    ADD_FAVORITES_FAIL, 
    ADD_FAVORITES_SUCCESS,
    ADD_FAVORITES_REQUEST, 
    REMOVE_FAVORITES_FAIL, 
    REMOVE_FAVORITES_SUCCESS,
    REMOVE_FAVORITES_REQUEST, 
    MOVIE_DETAILS_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    CLEAR_ERRORS } 
    from "../constants/movieConstants"

export const movieReducer = (state = { movies: [] }, action) => {

    switch (action.type) {
        case DISCOVER_REQUEST:
            case POPULAR_REQUEST:
                case SEARCH_REQUEST:
                    case LATEST_REQUEST:
            return {
                loading: true,
                movies: []
            };
            case DISCOVER_SUCCESS:
                case POPULAR_SUCCESS:
                    case SEARCH_SUCCESS:
                        case LATEST_SUCCESS:
            return {
                loading: false,
                movies: action.payload.results,
                totalPages: action.payload.total_pages,
                moviesCount:action.payload.total_results
            }
            case DISCOVER_FAIL:
                case POPULAR_FAIL:
                    case SEARCH_FAIL:
                        case LATEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
}


export const movieDetailsReducer = (state = { movie: {} }, action) => {

    switch (action.type) {
        case MOVIE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case MOVIE_DETAILS_SUCCESS:
            return {
                loading: false,
                movie: action.payload
            }
        case MOVIE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
}


export const getFavoritesReducer = (state = { movie: {} }, action) => {

    switch (action.type) {
                case FAVORITES_REQUEST:
                    case ADD_FAVORITES_REQUEST:
                        case REMOVE_FAVORITES_REQUEST:
            return {
                loading: true,
                ...state
            };
        
        case FAVORITES_SUCCESS:
            case ADD_FAVORITES_SUCCESS:
                case REMOVE_FAVORITES_SUCCESS:
            return {
                loading: false,
                favList: action.payload
            }
        case FAVORITES_FAIL:
            case ADD_FAVORITES_FAIL:
                case REMOVE_FAVORITES_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
}

