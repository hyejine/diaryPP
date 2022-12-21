import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { localDateRenderer } from "../../utils/index";
import "./write.scss";
import { Form, Button } from "react-bootstrap";
import CompletModal from "../common/CommonModal";

const Write = (props) => {
  const { currentUser } = props;
  const location = useLocation();
  const emojiId = location.state.data;
  const selectDate = location.state.date;
  const quillRef = useRef();
  const [emojiImage, setEmojiImage] = useState();
  const [quillText, setQuillText] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [diary_id, setDiary_id] = useState(false);

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

      if (file) { // 파일이 있다면 폼 데이터에 추가 
        formData.append("multipartFiles", file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axios.post('/board/register/imageUpload', formData);

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = (quillRef.current.getEditor().getSelection()).index;
        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);
        quillEditor.clipboard.dangerouslyPasteHTML(
          index,
          `<img src=${res.data} alt=${'alt text'} />`
        );
      }
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

  const onSubmit = (value) => {
    value.preventDefault();
    const data = {
      user_email: currentUser.email,
      diary_title: value.target.title.value,
      diary_content: quillText,
      diary_date: selectDate,
      emoji_image_id: emojiId,
    };
    axios.post("/board/saveQuill", data)
      .then((res) => {
        setDiary_id(res.data);
      })
      .catch((err) => console.log(err))
    setModalActive(true);
  };

  useEffect(() => {
    axios
      .get(`/emoji/getEmojiId/${emojiId}`)
      .then((res) => {
        setEmojiImage(res.data.emoji_image);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="boardPage">
      <Form onSubmit={onSubmit}>
        <div className="dateDiv">
          <span className="date">{localDateRenderer(selectDate)}</span>
          <span>
            <img src={emojiImage} className="emojiImage" alt="" />
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
            onChange={onHandleText}
          />
        </div>
        <div className="sendButtonWrap">
          <Button className="sendButton" type="submit">
            저장
          </Button>
        </div>
      </Form>
      <CompletModal
        currentUser={currentUser}
        diary_id={diary_id}
        show={modalActive}
        hide={() => setModalActive(false)}
        state="Success"
        contents="작성하신 글이 등록 되었습니다."
      />
    </div>
  );
};

export default Write;
