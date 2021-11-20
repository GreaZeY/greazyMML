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
            default:''
        },
        vote_average: {
            type: Number,
            default:0
        },
        release_date: {
            type: String,
            default:'--/--/--'
        },
        date_added:{
            type:Date,
            default:Date.now
        }

    }],
  

})





module.exports = mongoose.model("FavoritesOfMML", FavoriteSchema )
