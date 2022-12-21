import { useState, useEffect, useMemo, useRef } from "react";
import "./write.scss";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";
import { localDateRenderer } from "../../utils/index";
import SelectEmojiModal from "../calendar/SelectEmojiModal";
import CompletModal from "../common/CommonModal";
import axios from "axios";

const Edit = (props) => {
  const { currentUser } = props;
  const { diary_id } = useParams();
  const [diaryData, setDiaryData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [emojiId, setEmojiId] = useState();
  const quillRef = useRef();
  const [quillText, setQuillText] = useState();
  const [emojiImage, setEmojiImage] = useState();
  const [modalActive, setModalActive] = useState(false);

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
      console.log(res.data);

      if (quillRef.current) {
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

  const onSubmit = (value) => {
    value.preventDefault();
    const data = {
      diary_id: diary_id,
      diary_title: value.target.title.value,
      diary_content: quillText,
      // diary_date: selectDate,
      emoji_image_id: emojiId
    }
    axios.post("/board/updateQuill", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    setModalActive(true);
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
  // console.log(diaryData);
  const onHandleText = (value) => {
    setQuillText(value);
    // console.log(quillText);
  };

  const onChangeEmoji = () => {
    setModalOpen(true);

  }
  console.log(modalOpen);
  useEffect(() => {
    axios
      .get(`/board/getBoard/${diary_id}`)
      .then((res) => {
        setDiaryData(res.data[0]);
        console.log(res.data[0].diary_content);
        setQuillText(res.data[0].diary_content);
        setEmojiId(res.data[0].emojiImageDto.id);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (emojiId !== undefined) {
      console.log("??");
      axios
        .get(`/emoji/getEmojiId/${emojiId}`)
        .then((res) => {
          console.log(res);
          setEmojiImage(res.data.emoji_image);
        })
        .catch((err) => console.log(err));
    }
  }, [emojiId])

  // useEffect(()=>{
  // setEmojiId(diaryData?.emojiImageDto.id);
  // },[])
  console.log(emojiId);

  return (
    <div className="boardPage">
      <Form onSubmit={onSubmit}>
        <div className="dateDiv">
          <span className="date">{localDateRenderer(diaryData?.diary_date)}</span>
          <span>
            {emojiImage ?
              <img src={emojiImage} className="emojiImage clickEmoji" alt="" onClick={onChangeEmoji} /> :
              <img src={diaryData?.emojiImageDto.emoji_image} className="emojiImage clickEmoji" alt="" onClick={onChangeEmoji} />
            }
          </span>
        </div>
        <div className="title">
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              required
              defaultValue={diaryData?.diary_title}
              className="titleInput"
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
      <SelectEmojiModal
        state="기분을 선택하세요"
        currentUser={currentUser}
        show={modalOpen}
        clickEmoji={emojiId}
        setClickEmoji={setEmojiId}
        hide={() => setModalOpen(false)}
      />
      <CompletModal
        state="Success"
        currentUser={currentUser}
        diary_id={diary_id}
        show={modalActive}
        hide={() => setModalActive(false)}
        contents="수정이 완료되었습니다."
      />
    </div>
  );
};

export default Edit;
