import { ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const MoodProgressBar = (props) => {
    const { selectDay } = props;
    const [emojiCount, setEmojiCount] = useState();

    useEffect(() => {
      axios
        .get(`/board/getMonthProgress/${selectDay}`)
        .then((res) => {
          setEmojiCount(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectDay]);

    return (
      <div>
        <div className="moodTitle">[ 기분 분포 ]</div>
        <ProgressBar>
          {emojiCount?.slice(0).reverse().map((value, index) => (
              <OverlayTrigger overlay={<Tooltip>{value.emoji_mood+" : "+value.count * 10+"%"}</Tooltip>}>
                <div style={{ width: `${value.count * 100}%`}}>
                  <ProgressBar
                    className={`moodPercent${index}`}
                    now={value.count * 100}
                    key={1}
                    label={`${value.count * 10}%`}
                  />
                </div>
              </OverlayTrigger>
            ))}          
        </ProgressBar>
        <div className="emojiImage">
        {emojiCount?.slice(0).reverse().map((value, index) => (
          <div key={index} className="emoji_percent">
            <div>
            <img src={value.emoji_image} alt="" style={{width: 70}}/>
            </div>
            <span>{value.count*10}%</span>
          </div>
        ))}
        </div>
      </div>
    );
};

export default MoodProgressBar;
