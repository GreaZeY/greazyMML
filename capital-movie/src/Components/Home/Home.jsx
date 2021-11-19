import React, { Fragment,useEffect,useState } from 'react';

import Loading from '../Loader/Loading'
import {getMovies, clearErrors} from "../../actions/movieAction";
import {useSelector,useDispatch} from "react-redux";
import MovieCard from './MovieCard.jsx'
import {useAlert} from "react-alert"
import { useLocation} from 'react-router-dom'; 
import './Home.css'
import MetaData from "../layout/MetaData"; 

const Home = ({match}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [nextPage, setNextPage] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();

    useEffect(() => {
      setNextPage([])
        setPageNumber(1)
    }, [location]);

    const { loading, error, movies,totalPages} =
      useSelector((state) => state.movies);
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getMovies(pageNumber,'discover'));
    }, [dispatch, error, alert,pageNumber,match.params.query,location]);
  
    useEffect(() => {
        setNextPage((prevNextPage) => {
          if(movies) return [...prevNextPage, ...movies];
        });
    }, [movies]);
  
    if (pageNumber <= totalPages) {
      window.onscroll = function () {
        if (
          window.innerHeight + document.documentElement.scrollTop>=
          document.documentElement.offsetHeight
        ) {
          setPageNumber(pageNumber + 1);
        }
      };
    }
  
  
    useEffect(() => {
      setNextPage([])
      setPageNumber(1)
  }, [match.params.query]);
  

 

    return (
        <Fragment>
              <MetaData title={`Capital Movies: Discover`} />
                <img className='banner' src="/images/banner.jpg" alt="banner" />
                <div className='imageSpace'></div>
                <div className='imgbackdrop'>
                <h1>What have you watched?</h1>
                Create your personalized list from tens of thousands of titles on the world’s largest movie database.
                </div>
                <div className="discover">
                <h1>Discover</h1>
                <div className="movieContainer">
                { 
                nextPage&&
                nextPage.map(movie=><MovieCard movie={movie}></MovieCard>)
                }
                </div>
                </div>
                <div className='loader'>{loading?<Loading/>:''}</div> 
        </Fragment>
    )
}

export default Home
