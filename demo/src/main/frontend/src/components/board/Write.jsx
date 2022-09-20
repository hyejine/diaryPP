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

    useEffect(() => {
      axios.get(`/emoji/getEmojiId/${emojiId}`)
      .then(res => {console.log(res); setEmojiImage(res.data.emoji_image)})
      .catch(err => console.log(err))
    }, []);
    function imageUrlHandler() {

      const range = this.quill.getSelection();
      const url = prompt('please copy paste the image url here.');
  
      if (url) {
        // 커서위치에 imageUrl 삽입
        this.quill.insertEmbed(range.index, 'image', url);
      }
    }
  
    /**
     * image 제어
     */
    function imageHandler() {
  
      // // input file tag 생성
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', '.png,.jpg,.jpeg');
      input.click();
    console.log(input);
      input.addEventListener('change', async () => {
        const formData = new FormData();
            const file = input.files[0];
            formData.append('uploadFile', file); 
            axios({
              url: '/board/register/imageUpload',
              method: 'post',
              enctype: 'multipart/form-data',
              data: formData,
              processData: false,
              contentType: false,
              dataType: 'json'
            })
            // axios.post('/board/register/imageUpload',formData)
            .then(res => {console.log(res);  
              console.log(res.uploadPath);
              res.uploadPath = res.uploadPath.replace(/\\/g, '/');
            })
            .catch(err => console.log(err))
          });
      // // input change
      // input.onchange = (e) => {
  
      //   const files = e.target.files;
      //   const formData = new FormData();
      //   formData.append('files', files[0]);
  
      //   // file 등록
      //   const tempFile = api.file.postTempFileUpload(formData);
      //   tempFile.then(response => {
  
      //     // 커서위치 및 fileSrno 얻기
      //     const fileSrno = response.fileSrno;
      //     const range = this.quill.getSelection();
  
      //     this.quill.insertEmbed(range.index, 'image', 'http://localhost:8002/master/api/v1/upload/img/' + fileSrno);
      //   });
      // }
    }
  //  const imageHandler =()=>{
  //   const input = document.createElement("input");
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //    input.addEventListener('change', async () => {
  //     console.log('온체인지');
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append('img', file); 
  //     try {
  //       const result = await axios.post('http://localhost:4050/img', formData);
  //       console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
  //       const IMG_URL = result.data.url;
  //       const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
  //       const range = editor.getSelection();
  //       editor.insertEmbed(range.index, 'image', IMG_URL);
  //     } catch (error) {
  //       console.log('실패했어요ㅠ');
  //     }
  //   });
  // };
  
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
          // imageUrl: imageUrlHandler,
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
    const quillRef = useRef();
    const [quillText, setQuillText] = useState("");

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
