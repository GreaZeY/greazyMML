
#                                       [Capital Movie](https://famous-rose-earthworm.cyclic.app/)

Capital movie a web app where user can browse movies and add them to thier list.

#### [Open site](https://famous-rose-earthworm.cyclic.app/) 


- Account Management
- Large Database of Movies
- JWT token authentication
- Dark UI

## Technologies used
* NodeJS
* React.JS
* ExpressJS
* MongoDB

### Installing depencencies and running the app
* Fork the repository
* Clone the repository
* Install the dependencies by `npm install`
* Run in development mode by `npm start`

### But First You have to create a config.env file and put some variables.
- PORT=5453
- FRONTEND_URL="http://localhost:3000" change if you are deploying front and back end seperately
- DB_URI = "YOUR_MONGODB_URI"
- Go to https://www.themoviedb.org/settings/api make free account and get api key 
- TMDB_KEY = YOUR_TMDB_KEY
- JWT_SECRET = YOUR_SECRET
- JWT_EXPIRE=5d
- COOKIE_EXPIRE=5
- SMTP_SERVICE = gmail
- SMTP_HOST = smtp.gmail.com
- SMTP_PORT=465
- MAIL = YOUR_GMAIL_ID
- MAIL_PASSWORD =  YOUR_GMAIL_APP_PASS
- FORGOT_PASS_MSG='Your password can be reset by clicking the button below. If you did not request a new password, please ignore this email.'
 -Go to https://cloudinary.com/ and make free account and get api key
- CLOUDINARY_NAME = YOUR_CLOUDINARY_NAME
- CLOUDINARY_API_KEY = YOUR_CLOUDINARY_KEY
- CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_SECRET







