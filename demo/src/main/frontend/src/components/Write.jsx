import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Write = () => {
  const [data, setData] = useState("");

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
        axios.get('/api/getDB')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <table style={{border:'1px', borderColor:'red', borderStyle:'solid' }}>
        
        { data && data.map ((a, idx)=>(
          <ul>
          <li>{a.title}{a.content}</li>
          </ul>
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
