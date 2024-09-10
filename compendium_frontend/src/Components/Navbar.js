import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  var loc = location.pathname
  if (location.pathname == '/') {
    loc = 'Home'
  } else if (location.pathname == '/collection') {
    loc = 'Collection'
  } else if (location.pathname == '/settings') {
    loc = 'Settings'
  }

  return (
    <div position='static' className='navBarContainer'>
      <div className='currentLocation'>{loc}</div>
      <Link className='navLink' to="/">Home</Link>
      <Link className='navLink' to="/settings">Settings</Link>
    </div>
  )
}

export default Navbar;