import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Write = () => {
  const [data, setData] = useState("");
  const [content, setContent] = useState("");

  const onSend = (value) => {
    value.preventDefault();
    console.log(value.target.title.value, value.target.content.value);
     axios.post('/api/write', {
     
   
        title: value.target.title.value,
        content: value.target.content.value,
      
      
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error)); 
  };
  //     setTitle(value.target.title.value);
  //     setContent(value.target.content.value);
  //    console.log(title, content);
  //     axios.post('/api/write', {
  //     title: value.target.title.value,
  //     content: value.target.content.value
  // })
  // .then(response => console.log(response))
  // .catch(error => console.log(error))
  // }

  // Read
  useEffect(() => {
        axios.get('getDB')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
    <div>
        {data && data[1].title}
      <form onSubmit={onSend}>
        <input name="title" />
        <textarea name="content" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Write;
