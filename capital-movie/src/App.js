

import './App.css';
import { BrowserRouter as Routes,Route } from "react-router-dom";
import Header from './Components/Header/Header'
import Home from './Components/Home/Home.jsx';
import Latest from './Components/Latest/Latest.jsx';
import Popular from './Components/Popular/Popular.jsx';
import MovieDetails from './Components/MovieDetails/MovieDetails.jsx'
import MovieSearch from './Components/MovieSearch/MovieSearch.jsx'
import LoginAndSignUp from './Components/User/LoginAndSignup';
import ProtectedRoute from './Components/Route/ProtectedRoute'
import Profile from './Components/User/Profile'
import ResetPassword from './Components/User/ResetPassword'
import Favorites from './Components/Favorites/Favorites.jsx'


function App() {
 
  return (

    <Routes>
       <Header/>
     <Route exact path='/' component={Home}/>
     <Route exact path='/latest' component={Latest}/>
     <Route exact path='/popular' component={Popular}/>
     <Route exact path='/:id/details/:title' component={MovieDetails}/>
     <Route exact path='/movies/:query' component={MovieSearch}/>
     <Route exact path = "/login" component={LoginAndSignUp}/>
     <ProtectedRoute exact path = "/profile" component={Profile}/>
     <Route exact path = "/password/reset/:token" component={ResetPassword}/>
     <ProtectedRoute exact path = "/favorites" component={Favorites}/>
    </Routes>

  );
}

export default App;
