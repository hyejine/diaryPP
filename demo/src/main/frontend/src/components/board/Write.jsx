import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { localDateRenderer } from "../../utils/index";
import "./write.scss";
import { Form, Button } from "react-bootstrap";
import toolbarOptions from "../../utils/toolbarOptions";
const Write = () => {
  // const [data, setData] = useState("");
  const [contents, setContents] = useState("");
  const location = useLocation();
  const emojiId = location.state.data;
  const selectDate = location.state.date;

  const onSubmit = (value) => {
    value.preventDefault();
    console.log(value.target.title.value);
  };

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
  const [emojiImage, setEmojiImage] = useState();
    useEffect(() => {
      axios.get(`/emoji/getEmojiId/${emojiId}`)
      .then(res => {console.log(res); setEmojiImage(res.data.emoji_image)})
      .catch(err => console.log(err))
    }, []);

  return (
    <div className="writePage">
      <Form onSubmit={onSubmit}>
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
        <div className="dateDiv">
          <span className="date">{localDateRenderer(selectDate)}</span>
          <span><img src={emojiImage} className="emojiImage"/></span>
        </div>
        <div className="title">
          <Form.Group controlId="title">
            <Form.Control type="text" required placeholder="&quot;제목을 입력해주세요.&quot;"/>
          </Form.Group>
        </div>
        <div>
          <ReactQuill
            style={{ height: "441px" }}
            theme="snow"
            modules={toolbarOptions}
            placeholder="내용을 입력해주세요.🍀"
            // formats={this.formats}
            // value={value || ''}
            // onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
          />
        </div>
        <div className="sendButtonWrap">
          <Button className="sendButton" type="submit">
            저장
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Write;
