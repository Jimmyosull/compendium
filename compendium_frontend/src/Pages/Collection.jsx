import { useEffect, useState } from 'react';
import ImgGrid from '../Components/imgGrid';
import CollectionTopbar from '../Components/collection-topbar';
import AddOverlay from '../Components/AddOverlay';



const Collection = ({db_url}) => {

  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [posts, setPosts] = useState([]);

  const handleAddClick = () => {setOverlayVisible(true)}
  const closeAddOverlay = () => {setOverlayVisible(false)}

  const fetchPosts = () => {
    fetch(db_url + '/api/v1/all')
    .then(response => {
      if (!response.ok) {
        console.log("Failed to get all elements!")
      }
      return response.json();
    })
    .then(data => {
      setPosts(data)
    })
    .catch(error => {
      console.error('There was a problem with the fetch:', error)
    })
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {isOverlayVisible && <AddOverlay closeAddOverlay={closeAddOverlay} reloadPosts={fetchPosts}/>}
      <CollectionTopbar handleAddClick={handleAddClick}/>
      <ImgGrid postArray={posts} db_url={db_url}/>
    </div> );
}

export default Collection;
