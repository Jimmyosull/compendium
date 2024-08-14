import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const themeDark = createTheme({
  palette: {
    background: {
      default: "#1e1e2e"
    },
    primary: {
      main: "#89b4fa"
    },
    text: {
      primary: "#cdd6f4"
    },
    
  }
});


ReactDOM.render((
    <BrowserRouter>
      <ThemeProvider theme={themeDark}>
      <CssBaseline/>
      <App />
      </ThemeProvider>
    </BrowserRouter>
  
  ), document.getElementById('root')
);
