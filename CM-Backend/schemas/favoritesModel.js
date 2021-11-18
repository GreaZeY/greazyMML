const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    favList: [{
        id:{
            type:Number,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        poster_path: {
            type: String,
            required: true
        },
        vote_average: {
            type: Number,
            required: true
        },
        release_date: {
            type: String,
            required: true
        },
        date_added:{
            type:Date,
            default:Date.now
        }

    }],
  

})





module.exports = mongoose.model("FavoritesOfMML", FavoriteSchema )