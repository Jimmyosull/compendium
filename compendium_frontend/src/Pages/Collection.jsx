import { useEffect, useState } from 'react';
import ImgGrid from '../Components/imgGrid';
import CollectionTopbar from '../Components/collection-topbar';
import AddOverlay from '../Components/AddOverlay';
import EditOverlay from '../Components/EditOverlay';



const Collection = ({db_url}) => {

  const [isAddOverlayVisible, setAddOverlayVisible] = useState(false)
  const [editedPost, setEditedPost] = useState(null)
  const [posts, setPosts] = useState([]);

  const handleAddClick = () => {setAddOverlayVisible(true)}
  const closeAddOverlay = () => {setAddOverlayVisible(false)}

  const editPost = (post) => {setEditedPost(post)}
  const closeEditOverlay = () => {setEditedPost(null)}

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
      {isAddOverlayVisible && <AddOverlay closeAddOverlay={closeAddOverlay} reloadPosts={fetchPosts}/>}
      {editedPost && <EditOverlay post={editedPost} closeEditOverlay={closeEditOverlay} reloadPosts={fetchPosts}/>}
      <CollectionTopbar handleAddClick={handleAddClick}/>
      <ImgGrid postArray={posts} db_url={db_url} reloadPosts={fetchPosts} handleEditClick={editPost}/>
    </div>);
}

export default Collection;
