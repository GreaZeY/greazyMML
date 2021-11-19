import React, { Fragment,useEffect,useState } from 'react';

import Loading from '../Loader/Loading'
import {getMovies, clearErrors} from "../../actions/movieAction";
import {useSelector,useDispatch} from "react-redux";
import MovieCard from '../Home/MovieCard'
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData"; 

const Home = ({match,history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [nextPage, setNextPage] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
  

    const { loading, error, movies,totalPages} =
      useSelector((state) => state.movies);
      const { isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getMovies(pageNumber,'popular'));
    }, [dispatch, error, alert,pageNumber,match.params.query,isAuthenticated]);
  
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
  }, [match.params.query,history,isAuthenticated]);
  


    return (
        <Fragment>
           <MetaData title={`Popular`} />
                <div className="discover">
                <h1>Popular</h1>
                <div className="movieContainer">
                { 
                nextPage.map(movie=><MovieCard movie={movie}></MovieCard>)
                }
                </div>
                </div>
                <div className='loader'>{loading?<Loading/>:''}</div> 
        </Fragment>
    )
}

export default Home
