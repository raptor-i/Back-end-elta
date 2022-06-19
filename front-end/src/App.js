import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
function App() {

  const [Fileinput, setFileinput] = useState('');
  const [FileUped, setFileUped] = useState(null);


  const PostImageData = (e) =>
  {
    if(FileUped)
    {
      const formData = new FormData();
      formData.append("image", FileUped)
      axios.post("/image",formData).then(response => console.log(response)).catch(err => console.log(err));
      return;
    }
    alert("Select an image!");
    
  } 
  
  const GetImageData = () =>
  {
    if(Fileinput != '')
    {
      axios.get("/image/"+Fileinput).then(response => console.log(response)).catch(err => console.log(err));
      return;
    }
    alert("Type an image path!")
  }

  const FileHandler = (e) =>
  {
    setFileUped(e.target.files[0]);
  }

  const FileinputHandler = (e) =>
  {
    setFileinput(e.target.value);
  }

  return (
    <div className="App">
      <div className='Upload-Area'>
        <input type="text" placeholder='Image File Name' value={Fileinput} onChange={FileinputHandler}></input>
        <input type="file" name="file" onChange={FileHandler} accept="image/*"/>
      </div>
      <div className='Button-Upload'>
        <button onClick={GetImageData}>Get</button>
        <button onClick={PostImageData}>Upload</button>
      </div>
    </div> 
  );
}

export default App;
