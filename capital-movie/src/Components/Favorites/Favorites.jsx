import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import  MovieCard from '../Home/MovieCard'
import { getFavList } from "../../actions/movieAction";
import MetaData from "../layout/MetaData";  
const Favorites = () => {

    const { user,  isAuthenticated } = useSelector((state) => state.user);
    const {favList,loading} = useSelector(state => state.UserFavList)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isAuthenticated===true){
          dispatch(getFavList(user._id))
        }
      },[user,isAuthenticated,dispatch])

    return (
        <Fragment>
            <MetaData title={`Favorites`} />
            <div className="discover">
                <h1>Favorites</h1>
                <div className="movieContainer">
            {loading===false?
            favList&&
                favList.UserFavList.favList.map(favitem=><MovieCard movie={favitem} favtab={true}/>)
            
            :
            ''
        } </div>
     </div>
        </Fragment>
    )
}

export default Favorites
