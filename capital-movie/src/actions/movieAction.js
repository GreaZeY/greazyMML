import axios from "axios";
import { 
    DISCOVER_FAIL, 
    DISCOVER_REQUEST, 
    DISCOVER_SUCCESS,  
    FAVORITES_FAIL, 
    FAVORITES_REQUEST, 
    FAVORITES_SUCCESS, 
    ADD_FAVORITES_FAIL, 
    ADD_FAVORITES_REQUEST, 
    ADD_FAVORITES_SUCCESS,
    REMOVE_FAVORITES_FAIL, 
    REMOVE_FAVORITES_REQUEST, 
    REMOVE_FAVORITES_SUCCESS,
    MOVIE_DETAILS_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    CLEAR_ERRORS } 
    from "../constants/movieConstants"

export const getMovies=(pageNumber=1,type,query="")=> async(dispatch)=>{
    try{
        dispatch({type:DISCOVER_REQUEST});
        let url = `/api/v1/${type}`
        const config = { headers: { "Content-Type": "application/json" } };
  
        const { data } = await axios.post(
          url,
          {pageNumber:pageNumber,
          query:query},
          config
        );
        dispatch({
            type:DISCOVER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:DISCOVER_FAIL,
            payload:error.response
        })
    }

}

export const getMovieDetails=(id)=> async(dispatch)=>{
    try{
        dispatch({type:MOVIE_DETAILS_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        let url = `/api/v1/moviedetails`
        const { data } = await axios.post(
          url,
          {movieId:id},
          config
        );
        dispatch({
            type:MOVIE_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:MOVIE_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }

}


export const addToFavList=(userId,movieId)=> async(dispatch)=>{
    try{
        dispatch({type:ADD_FAVORITES_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        let url = `/api/v1/addtofavorites`
        const { data } = await axios.post(
          url,
          {userId:userId,
            movieId:movieId},
          config
        );
        dispatch({
            type:ADD_FAVORITES_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ADD_FAVORITES_FAIL,
            payload:error.response.data.message
        })
    }

}

export const remFromFavList=(userId,movieId)=> async(dispatch)=>{
    try{
        dispatch({type:REMOVE_FAVORITES_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        let url = `/api/v1/remfromfav`
        const { data } = await axios.post(
          url,
          {userId:userId,
            movieId:movieId},
          config
        );
        dispatch({
            type:REMOVE_FAVORITES_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:REMOVE_FAVORITES_FAIL,
            payload:error.response.data.message
        })
    }

}

export const getFavList=(userId)=> async(dispatch)=>{
    try{
        dispatch({type:FAVORITES_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        let url = `/api/v1/getfavlist`
        const { data } = await axios.post(
          url,
          {userId:userId},
          config
        );
        dispatch({
            type:FAVORITES_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:FAVORITES_FAIL,
            payload:error.response.data.message
        })
    }

}









// Clear Errors
export const clearErrors= ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}

