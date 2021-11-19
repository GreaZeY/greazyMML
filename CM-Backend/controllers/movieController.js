const axios = require('axios');
const catchAsyncErros = require('../middleware/catchAsyncErrors')
const ErrorHandler = require("../utils/errorhandler")
const Favorites = require("../schemas/favoritesModel")


exports.discover = catchAsyncErros(async (req,res,next)=>{
// console.log(req.body)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.body.pageNumber}&with_watch_monetization_types=flatrate`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });
})


exports.popular = catchAsyncErros(async (req,res,next)=>{

    axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.TMDB_KEY}&language=en-US&page=${req.body.pageNumber}`)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });
})

exports.latest = catchAsyncErros(async (req,res,next)=>{
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}&language=en-US&page=${req.body.pageNumber}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });
})

exports.search = catchAsyncErros(async (req,res,next)=>{
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${req.body.query}&page=${req.body.pageNumber}&include_adult=false`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });
})



exports.movieDetails = catchAsyncErros(async (req,res,next)=>{
    axios.get(`https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });
})

exports.addToFavorites = catchAsyncErros(async (req,res,next)=>{
    axios.get(`https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    .then(async (response) => {
        let UserFavList = await Favorites.findOne({user:req.body.userId})
        
        if(!UserFavList){
        UserFavList = await Favorites.create({
            user:req.body.userId,
            favList:[
                {
                    id: response.data.id,
                     title: response.data.title,
                      poster_path:response.data.poster_path,
                      vote_average:response.data.vote_average,
                      release_date:response.data.release_date
                 }
            ]
        })
    }else{
        UserFavList.favList = UserFavList.favList.filter((item) => item.id !== response.data.id )
            UserFavList.favList.unshift({
                id: response.data.id,
                 title: response.data.title,
                  poster_path:response.data.poster_path,
                  vote_average:response.data.vote_average,
                  release_date:response.data.release_date
             })
            await UserFavList.save()
    }
    res.status(200).json({
        success:true,
        UserFavList
    })
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });


})
exports.removeFromFavorites = catchAsyncErros(async (req,res,next)=>{
    axios.get(`https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    .then(async (response) => {
        let UserFavList = await Favorites.findOne({user:req.body.userId})
        
        if(!UserFavList){
            return next(new ErrorHandler('List does not exist.',400))
    }else{
        UserFavList.favList = UserFavList.favList.filter((item) => item.id !== response.data.id )
            await UserFavList.save()
    }
        res.status(200).json({
            success:true,
            UserFavList
        })
    })
    .catch(error => {
        return next(new ErrorHandler(error.message,400))
    });


})

exports.getFavList = catchAsyncErros(async (req,res,next)=>{

        let UserFavList = await Favorites.findOne({user:req.body.userId})
      

        if (!UserFavList) {
            return next(new ErrorHandler("You haven't added anything to List",400));
        }

        res.status(200).json({
            success: true,
            UserFavList
        })

})
