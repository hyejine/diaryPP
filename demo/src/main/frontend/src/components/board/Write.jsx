import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { RangeStatic } from "quill";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { localDateRenderer } from "../../utils/index";
import "./write.scss";
import { Form, Button } from "react-bootstrap";
import CustomToolbar from "../../utils/CustomToolbar";
import CommonModal from "../common/CommonModal";

const Write = () => {
  const location = useLocation();
  const emojiId = location.state.data;
  const selectDate = location.state.date;

  const [emojiImage, setEmojiImage] = useState();
  const [url, setUrl] = useState();
  useEffect(() => {
    axios
      .get(`/emoji/getEmojiId/${emojiId}`)
      .then((res) => {
        console.log(res);
        setEmojiImage(res.data.emoji_image);
      })
      .catch((err) => console.log(err));
  }, []);

  const quillRef = useRef();
  const [quillText, setQuillText] = useState("");

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  const imageHandler = () => {
    // input file tag 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");   // input type을 file로 바꾼다. 
    input.setAttribute("accept", "image/*");   // input에 허용되는 파일 
    input.click();
    
    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if(file) { // 파일이 있다면 폼 데이터에 추가 
        formData.append("multipartFiles", file[0]);
    }

     // file 데이터 담아서 서버에 전달하여 이미지 업로드
     const res = await axios.post('/board/register/imageUpload', formData);
     console.log(res);

     if(quillRef.current) {
      // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
      const index = (quillRef.current.getEditor().getSelection()).index;

      console.log(quillRef.current.getEditor().getSelection());
      console.log(index);

      const quillEditor = quillRef.current.getEditor();
      console.log(quillEditor);

      quillEditor.setSelection(index, 1);

      quillEditor.clipboard.dangerouslyPasteHTML(
          index,
          `<img src=${res.data} alt=${'alt text'} />`
      );
  }
      // axios
      //   .post("/board/register/imageUpload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     const result = res.data.replace(/\\/g, "/");
      //     setUrl(result);

      //     const range = quillRef.current?.getEditor().getSelection()?.index;
      //     if (range !== null && range !== undefined) {
      //       let quill = quillRef.current?.getEditor();

      //       quill?.setSelection(range, 1);

      //       quill?.clipboard.dangerouslyPasteHTML(
      //         range,
      //         `<p>efefe
      //             <img src={url}  alt="이미지 태그가 삽입됩니다."/></p>`
      //       );
      //     }
      //   })
      //   .catch((err) => console.log(err));
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean", "code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
    "list",
    "indent",
    "link",
    "align",
    "color",
    "background",
    "clean",
    "code-block",
  ];

  const onHandleText = (value) => {
    setQuillText(value);
  };

  const [modalActive, setModalActive] = useState(false);
  const onSubmit = (value) => {
    value.preventDefault();
    const data = {
      user_email: "e",
      diary_title: value.target.title.value,
      diary_content: quillText,
      diary_date: selectDate,
      emoji_image_id: emojiId,
    };
    console.log(data);
    axios.post("/board/saveQuill",data)
    .then((res)=> console.log(res))
    .catch((err)=>console.log(err))

    setModalActive(true);
  };

  return (
    <div className="boardPage">
      <Form onSubmit={onSubmit}>
        <div className="dateDiv">
          <span className="date">{localDateRenderer(selectDate)}</span>
          <span>
            <img src={emojiImage} className="emojiImage" />
          </span>
        </div>
        <div className="title">
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              required
              placeholder='"제목을 입력해주세요."'
            />
          </Form.Group>
        </div>
        <div className="text-editor">
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

      <CommonModal 
      modalActive={modalActive} 
      setModalActive={setModalActive}
      />
      
    </div>
  );
};

export default Write;
