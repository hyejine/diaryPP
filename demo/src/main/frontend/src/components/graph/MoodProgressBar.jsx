import { ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const MoodProgressBar = (props) => {
    const {selectMonth} = props;
    const [ emojiCount, setEmojiCount ] = useState();
    const [ emojiImage, setEmojiImage ] = useState();

    useEffect(() => {
        axios
        .get(`/board/getMonthProgress/${selectMonth}`)
        .then((res) => {
            // console.log(res);
            setEmojiCount(res.data);
           
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);

    useEffect(()=>{
      axios
      .get(`/emoji/getEmojiList`)
      .then((res) => {
          // console.log(res.data[0]);
          setEmojiImage(res.data[0]);
      })
      .catch((error) => console.log(error));
    },[])

  return (
    <div>
      <div className="moodTitle">기분 분포</div>
      <ProgressBar>
        {emojiCount?.map((value, index)=>(
              //   <OverlayTrigger
              //   overlay={
              //     <Tooltip >
              //     {value.count*10}
              //     </Tooltip>
              //   }
              // >
              //   <div style={{width: `${value.count*10}%`}}>
          
        <ProgressBar className={`moodPercent${index}`} now={value.count*100} key={1} label={`${value.count*10}%`}/>
     
        // </div>
        //  </OverlayTrigger>
        ))}
    </ProgressBar>
    <div className="emojiImage">
      
      {emojiImage?.emoji_type.map((value)=>(
        <div>
          <img src={value.emoji_image} alt="" style={{width: 70}}/>
        </div>
      ))}
    </div>
    <div>
    {emojiCount?.map((value, index)=>(
      <span>
        {value.count*10}
      </span>
       ))}
    </div>
    </div>
  );
};

export default MoodProgressBar;
