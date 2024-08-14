import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{flexGrow: 1}}>
          {loc}
        </Typography>
        <Button color='inherit' component={Link} to="/">
          Home
        </Button>
        <Button color='inherit' component={Link} to="/collection">
          Collection
        </Button>
        <Button color='inherit' component={Link} to="/settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;