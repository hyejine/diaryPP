import React from "react";
import { useState, useEffect, useMemo, useRef} from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { localDateRenderer } from "../../utils/index";
import "./write.scss";
import { Form, Button } from "react-bootstrap";
import CustomToolbar  from "../../utils/CustomToolbar";

const Write = () => {
  const location = useLocation();
  const emojiId = location.state.data;
  const selectDate = location.state.date;

  const [emojiImage, setEmojiImage] = useState();
const [url, setUrl] = useState();
    useEffect(() => {
      axios.get(`/emoji/getEmojiId/${emojiId}`)
      .then(res => {console.log(res); setEmojiImage(res.data.emoji_image)})
      .catch(err => console.log(err))
    }, []);

  
    const quillRef = useRef();
    const [quillText, setQuillText] = useState("");
    console.log(url);

   const imageHandler=() =>{
      // // input file tag 생성
      const input = document.createElement('input');
      const formData = new FormData();
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      
      // 파일이 input 태그에 담기면 실행 될 함수 
        input.onchange = async () => {
        const file = input.files[0];
            formData.append('uploadFile', file); 
            axios.post('/board/register/imageUpload',formData, {
              'headers': {
                'Content-Type': "multipart/form-data"
             }
            })
            .then(res => {
              console.log(res.data);
              const result = res.data.replace(/\\/g, '/');
              setUrl(result);
              
              const range = quillRef.current?.getEditor().getSelection()?.index;
              if (range !== null && range !== undefined) {
                let quill = quillRef.current?.getEditor();
    
                quill?.setSelection(range, 1);
    
                quill?.clipboard.dangerouslyPasteHTML(
                  range,
                  `<p>efefe
                  <img src={url}  alt="이미지 태그가 삽입됩니다."/></p>`
                );
              }
            })
            .catch(err => console.log(err))
          };
    
    }
    console.log(url);
  
   const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: []}],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean", "code-block"]
        ],
        handlers: {
          image: imageHandler
        },
      },
    };
  }, []);
  
    const formats = [
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'image',
      'list',
      'indent',
      'link',
      'align',
      'color',
      'background',
      'clean',
      'code-block'
    ];


    const onHandleText = (value) => {
      setQuillText(value);
    };
    
  const onSubmit = (value) => {
    value.preventDefault();
    const data = {
      email:"",
      title:value.target.title.value,
      content: quillText,
      dairyDate: selectDate,
      emoji: emojiImage
    }
    console.log(data);
  };


  return (

  
    <div className="writePage">
      <Form onSubmit={onSubmit}>
        <div className="dateDiv">
          <span className="date">{localDateRenderer(selectDate)}</span>
          <span><img src={emojiImage} className="emojiImage"/></span>
        </div>
        <div className="title">
          <Form.Group controlId="title">
            <Form.Control type="text" required placeholder="&quot;제목을 입력해주세요.&quot;"/>
          </Form.Group>
        </div>
        <div className="text-editor">
        {/* <CustomToolbar /> */}
          <ReactQuill
            style={{ height: "441px" }}
            theme="snow"
            ref={quillRef}
            formats={formats}
            modules={modules}
            placeholder="내용을 입력해주세요.🍀"
            value={quillText} 
            onChange={onHandleText}
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
