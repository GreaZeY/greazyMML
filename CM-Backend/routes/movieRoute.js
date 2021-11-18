const express = require('express')
const router = express.Router()
const { popular, latest, search, discover, movieDetails, addToFavorites, getFavList, removeFromFavorites } = require('../controllers/movieController.js')
const { isAuthenticatedUser } = require('../middleware/auth')


router.route("/discover").post(discover)
router.route("/popular").post(popular)
router.route("/latest").post(latest)
router.route("/search").post(search)
router.route("/moviedetails").post(movieDetails)
router.route("/addtofavorites").post(isAuthenticatedUser, addToFavorites)
router.route("/getfavlist").post(isAuthenticatedUser, getFavList)
router.route("/remfromfav").post(isAuthenticatedUser, removeFromFavorites)
module.exports =router