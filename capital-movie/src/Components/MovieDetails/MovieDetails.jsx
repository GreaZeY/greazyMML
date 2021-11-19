import React, {Fragment,useEffect}from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails,clearErrors } from "../../actions/movieAction";
import {useAlert} from "react-alert"
import Loading from '../Loader/Loading';
import './MovieDetails.css'


const MovieDetails = ({match,history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { movie, loading, error } = useSelector(
      (state) => state.movieDetails
    );
  
    
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      console.log('mid',match.params.id)
      dispatch(getMovieDetails(match.params.id));
      }, [dispatch, match.params.id,alert,error]);
  
      const imgURL = movie?`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`:''
    

    return (
      <Fragment>
          {
              loading?<div className="LoadingBackdrop"><Loading/></div>
              :
              <Fragment>
                  <div className="detailsContainer">
                    <div className="left">
                      <img src={imgURL} alt={movie.title} />
                      </div>
                      <div className="right">
                        <h1>{movie.title}</h1>
                        <p className='rating'>Status: {movie.status}</p>
                        <p className='rating'>{movie.release_date}</p>
                        <p className='vote'>{movie.vote_average } Rating {` (${movie.vote_count} votes)`}</p>
                        <div className="genres">
                        
                        {movie.genres && 
                        movie.genres.map(genre=><p>• {genre.name}</p>)}
                        </div>
                        <p className='tagline'>{movie.tagline&&movie.tagline}</p>
                        <h2>Synopsis</h2>
                        <p>{movie.overview}</p>
                        <div className="Sinfo">
                          <div>
                          <h3>Budget</h3>
                          <p>	${parseInt(movie.budget/1000000)} M</p>
                          </div>
                          <div>
                          <h3>Revenue</h3>
                          <p>	${parseInt(movie.revenue/1000000)} M</p>
                          </div>
                          <div>
                          <h3>Original Language</h3>
                          <p style={{textTransform:'uppercase'}} >{movie.original_language}</p>
                          </div>
                        </div>
                        <div className="homepage">
                       <a href={movie.homepage} target='blank'>Visit Official Site</a>
                       </div>




                      </div>
                      
                  </div>
                  </Fragment>
          }
      </Fragment>
    );
  
}

export default MovieDetails

