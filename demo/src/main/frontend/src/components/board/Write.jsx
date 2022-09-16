import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  // const [data, setData] = useState("");
  const location = useLocation();
  const emojiId = location.state.data;

  //   const onSend = (value) => {
  //     value.preventDefault();
  //      axios.post('/api/write', {
  //         title: value.target.title.value,
  //         content: value.target.content.value
  //     })
  //       .then((response) => console.log(response))
  //       .catch((error) => console.log(error));
  //   };
  // console.log(emojiId);
  //   // Read
  //   useEffect(() => {
  //         // axios.get('/api/getDB')
  //         // .then(response => setData(response.data))
  //         // .catch(error => console.log(error))
  //   }, []);

  return (
    <div>
      {/* <table style={{border:'1px', borderColor:'red', borderStyle:'solid' }}>
        
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
      </form> */}

      <ReactQuill
        
        style={{ height: "600px" }}
        theme="snow"
        // modules={this.modules}
        // formats={this.formats}
        // value={value || ''}
        // onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
      />
    </div>
  );
};

export default Write;
