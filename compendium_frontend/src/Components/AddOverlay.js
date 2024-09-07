import { useState } from "react";
import "./addOverlay.css"

const AddOverlay = ({closeAddOverlay, reloadPosts}) => {
  const [inputName, setInputName] = useState('')
  const [inputLink, setInputLink] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const handleNameChange = (e) => {setInputName(e.target.value)}
  const handleLinkChange = (e) => {setInputLink(e.target.value)}
  const handleFileChange = (e) => {setSelectedFile(e.target.files[0])}

  const addToDB = async () => {
    let payload = {'name': inputName, 'link': inputLink}
    if (inputName == '') {
      closeAddOverlay();
      reloadPosts();
      return;
    }

    // send data
    const response = await fetch('http://localhost:8001/api/v1/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.log("Response was not ok, status: ", response.status)
    }
    const result = await response.json();
    
    // send img
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile)
      const r = await fetch('http://localhost:8001/api/v1/imageUpdate?id='+result.id, {
        method: 'POST',
        body: formData
      })
      if (!r.ok) {
        console.log("Failed to upload img!")
      }
      setSelectedFile(null)
    }
    

    
    closeAddOverlay();
    reloadPosts();
  }



  return(
    <div className="overlay">
      <div className="inputArea">
      <p>Add a Post!</p>
        <p className="input">
          Name: <input type="text" value={inputName} placeholder="Name" onChange={handleNameChange}></input><br/>
        </p>
        <p className="input">
          Link: <input type="text" value={inputLink} placeholder="Link" onChange={handleLinkChange}></input><br/>
        </p>
        <p>
          Image: <input type="file" onChange={handleFileChange} accept="image/png"></input>
        </p>
        <div style={{display: "flex"}}>
          <div className="button" onClick={addToDB} style={{flex: .5}}>Add item</div>
          <div onClick={closeAddOverlay} className="button" style={{flex: .5}}>Close!</div>
        </div>
  
      </div>
    </div>
  )
};

export default AddOverlay