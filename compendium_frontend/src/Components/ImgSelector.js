import { useRef, useState } from "react"
import "./imgSelector.css"


const ImgSelector = ({onFileChange}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragExit = () => {setIsDragging(false)};
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    console.log(e.dataTransfer)

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        if (item.kind === 'file') {
          setImageFile(item.getAsFile());
          onFileChange(item.getAsFile());
          return;
        } 
        else if (item.type === 'text/x-moz-url-data') {
          // TODO: download serverside, and send back/display
          let url = e.dataTransfer.getData(item.type);
          const response = await fetch(url, {mode: 'no-cors'});
          if (!response.ok) {
            console.log("Failed to get dropped image from url!")
            return;
          }

          const imgBlob = await response.blob();
          let filetype =  url.match(/\.([^.]+)$/)[1]
          filetype = (filetype == 'jpg') ? "jpeg" : filetype;
          const file = new File([imgBlob], "name", {type: `image/${filetype}`})
          
          setImageFile(file);
          onFileChange(file);
          return;
        }
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0].type.startsWith('image/')) {
      console.log(e.target.files[0])
      setImageFile(e.target.files[0])
      onFileChange(e.target.files[0])
    }
  }

  return (
    <div style={{display:'flex'}}>
    <p
      onDragEnter={handleDragEnter}
      onDragOver={(e) => {e.preventDefault()}}
      onDragLeave={handleDragExit}
      onDrop={handleDrop}
      className={`dropZone ${isDragging ? 'dragging': ''}`}>
      Image: 
      <input type="file" onChange={handleFileChange} accept="image/*"
        ref={fileInputRef} style={{display: 'none'}}/>
      <button onClick={() => {fileInputRef.current.click();}}>Select Files</button>
      
    </p>
    {imageFile && <img src={URL.createObjectURL(imageFile)}
    alt={imageFile.name}
    className="previewImg"
    onDrag={ (e) => {e.preventDefault();}}
    />}
    </div>
  )
}

export default ImgSelector;