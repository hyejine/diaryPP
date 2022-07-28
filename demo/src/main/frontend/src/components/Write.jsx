import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
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

  useEffect(() => {
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
      <form onSubmit={onSend}>
        <input name="title" />
        <textarea name="content" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Write;
