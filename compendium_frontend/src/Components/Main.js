import { Route, Routes } from 'react-router-dom';


import Home from '../Pages/Home';
import Collection from '../Pages/Collection';
import Settings from "../Pages/Settings";
import NoPage from "../Pages/NoPage"


function Main() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='*' element={<NoPage />} />
    </Routes>
  );
}

export default Main;