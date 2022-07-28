import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Write = () => {
  const [data, setData] = useState("");
  const [content, setContent] = useState("");

  const onSend = (value) => {
    value.preventDefault();
     axios.post('/api/write', {
        title: value.target.title.value,
        content: value.target.content.value
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error)); 
  };

  // Read
  useEffect(() => {
<<<<<<< HEAD
        axios.get('getDB')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
    <div>
        {data && data[1].title}
=======
        axios.get('/api/getDB')
        .then(response => setTitle(response.data))
        .catch(error => console.log(error))
  }, []);

const onEdit =(value)=>{
console.log(value);
}
  return (
    <div>
      <table style={{border:'1px', borderColor:'red', borderStyle:'solid' }}>
        
        { title && title.map ((a, idx)=>(
          <></>
          // <ul>
          // <li>{a.title}{a.content}<button onClick={onEdit(a)}>수정</button></li>
          // </ul>
      ))}
      
      </table>
>>>>>>> 1b2c0f2ef6ee4b24666f36641f33a9e020e48383
      <form onSubmit={onSend}>
        <input name="title" />
        <textarea name="content" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Write;
