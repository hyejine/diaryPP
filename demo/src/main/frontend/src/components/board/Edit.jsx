import { useState, useEffect, useMemo, useRef } from "react";
import "./write.scss";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";
import { localDateRenderer } from "../../utils/index";
import axios from "axios";

const Edit = () => {
  const { diary_id } = useParams();
  const [diaryData, setDiaryData] = useState();

  useEffect(() => {
      axios
      .get(`/board/getBoard/${diary_id}`)
      .then((res) => {
        setDiaryData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const quillRef = useRef();
  const [quillText, setQuillText] = useState();

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
  };
};

  const onSubmit =(value)=>{
    value.preventDefault();
  }

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
console.log(diaryData);
  const onHandleText = (value) => {
    setQuillText(value);
    console.log(quillText);
  };

  const onChangeEmoji = () =>{

  }
  // const placeholder = dangerouslySetInnerHTML={{ __html: diaryData.diary_content }};
  return (
    <div className="boardPage">
      <div className="boardScroll">
      <div className="editPage">
            <Form onSubmit={onSubmit}>
        <div className="dateDiv">
          <span className="date">{localDateRenderer(diaryData?.diary_date)}</span>
          <span>
            <img src={diaryData?.emojiImageDto.emoji_image} className="emojiImage" alt="" onClick={onChangeEmoji}/>
          </span>
        </div>
        <div className="title">
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              required
              placeholder={diaryData?.diary_title}
            />
          </Form.Group>
        </div>
        <div className="text-editor">
          {diaryData && 
          <ReactQuill
            style={{ height: "441px" }}
            theme="snow"
            ref={quillRef}
            formats={formats}
            modules={modules}
            defaultValue={diaryData?.diary_content}
            onChange={onHandleText}
          />
         } 
        </div>
        <div className="sendButtonWrap">
          <Button className="sendButton" type="submit">
            저장
          </Button>
        </div>
      </Form>
      </div>
      </div>
    </div>
  );
};

export default Edit;
