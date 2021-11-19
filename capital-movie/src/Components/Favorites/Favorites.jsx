import React, { Fragment} from "react";
import { useSelector} from "react-redux";
import  MovieCard from '../Home/MovieCard'
import MetaData from "../layout/MetaData";  
const Favorites = () => {


    const {favList,loading} = useSelector(state => state.UserFavList)

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
