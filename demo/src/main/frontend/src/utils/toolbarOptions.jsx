
const toolbarOptions = {
    toolbar: [
      [{ font: [] }],
      [{ size: []}],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean", "code-block"],
      // [{handlers : {image : imageHandler}}]
    ],
  };
  export default toolbarOptions;