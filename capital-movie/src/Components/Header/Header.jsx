import React,{useState,useEffect} from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout,loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { getFavList } from '../../actions/movieAction';
const Header = () => {

    const [keyword, setKeyword] = useState("");
    const history = useHistory();
    const alert = useAlert();

    const search = (e) => {
      e.preventDefault();
      if(keyword.trim()){
        history.push(`/movies/${keyword}`)
      }
          
    };
    const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector(state => state.user)
    useEffect(() => {  
      dispatch(loadUser())
    }, [history,dispatch])

      useEffect(()=>{
        if(isAuthenticated===true){
          dispatch(getFavList(user._id))
        }
      },[user,isAuthenticated,dispatch])

    const logoutUser = () => {
      dispatch(logout());
    alert.success("Logged out Successfully");
    }
    
    return (
        <div className="header">
            <div className="left">
            <Link to='/'>
                <img draggable='false' src="/images/logo.png" alt="My Movie List" />
                </Link>
                <form className='search' onSubmit={search}>
                    <input type="text" placeholder='Search' onChange={(e) => setKeyword(e.target.value)}/>
                    <button type="submit" ><SearchIcon/></button>
                  </form>
                  </div>
                <div className='navlinks'>
                <Link to='/popular' >Popular</Link>
                <Link to='/latest'>Latest</Link>
                {isAuthenticated?<Link to='/login?redirect=favorites' >Favorites</Link>:''}
                {isAuthenticated?
                <div className='profile'>
                <div className='avatar'><Link  to='/profile'><img  src={user.avatar.url} alt={user.name}/></Link></div>
                <div className="accMenu">
                  <Link to='/profile'><PersonIcon/>Your Profile</Link>
                  <Link to='/favorites'><FavoriteIcon/>Favourites</Link>
                  <a><button onClick={logoutUser} ><LogoutIcon/>Logout</button></a>
                </div>
                </div>
                :
                <Link to='/login'><button>Sign In</button></Link>
                }
            </div>
        </div>
    )
}

export default Header
