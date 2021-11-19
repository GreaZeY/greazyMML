import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFavList,
  getFavList,
  remFromFavList
} from "../../actions/movieAction";
import { useAlert } from "react-alert";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";


const MovieCard = ({ movie,favtab }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, favList } = useSelector((state) => state.UserFavList);
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [inFavList, setInFavList] = useState(false);
  const [message, setMessage] = useState('');
  const imgURL = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`;


  

  const addtoFav = (id) => {
    if(isAuthenticated===false){
      history.push('/login?redirect=favorites')
    }else{
     dispatch(addToFavList(user._id, id));
     setMessage("Added to favorites");
    }
  };
  
  const removeFromFav = (id) => {

    setInFavList(false);
    dispatch(remFromFavList(user._id, id));
    setMessage("Removed from favorites");
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(getFavList(user._id));
    }
  }, [user, isAuthenticated, dispatch]);

  useEffect(()=>{
    if(message){
      alert.success(message)
      setMessage('')
    
    }
  },[favList])

  useEffect(() => {
    if(isAuthenticated===true&&favList){
      favList.UserFavList.favList.map((favitem) => {
        if (favitem.id === movie.id) {
          setInFavList(true);
        }
      });
    }
  }, [favList]);

  return (
    <Fragment>
      {!loading ? ((!favtab||inFavList)?
        <div key={movie.id} className="cardContainer">
          <Link to={`/${movie.id}/details/${movie.title}`}>
            <div className="movieCard">
              <div>
                <img dragable="false" src={imgURL} alt={movie.title} />
              </div>
              <div className="info">
                <h1>{movie.title}</h1>
                <span>{movie.vote_average}</span>
              </div>

              <p>{movie.release_date}</p>
            </div>
          </Link>
          {inFavList===true?
            <button onClick={() => removeFromFav(movie.id)} style={{background:'red'}} className="addToFav">
              Remove
            </button>
            :
            <button  onClick={() => addtoFav(movie.id)}  className="addToFav">
              +Add to Favorites
            </button>
         }
        </div>:''
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default MovieCard;
