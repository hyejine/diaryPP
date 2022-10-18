import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { chartDateRender } from "../../../utils/index";

const MonthLine = (props) => {
    const { selectMonth } = props;
    const [monthData, setMonthData] = useState();
    const [ emojiImage, setEmojiImage ] = useState();
    const getMoodGrap = null;

    useEffect(() => {
        axios
        .get(`/board/getMonth/${selectMonth}`)
        .then((res) => {
            setMonthData(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);

    useEffect(()=>{
        axios
        .get(`/emoji/getEmojiList`)
        .then((res) => {
            console.log(res.data[0].emoji_type);
            setEmojiImage(res.data[0].emoji_type);
        })
        .catch((error) => console.log(error));
      },[])

    // console.log(monthData);

const data = [
    {
        id: "diary",
                    data: monthData?.map((value) => ({
                        // x: test?.map((v)=>(
                        //     v.value
                        // )),
                        x: chartDateRender(value.diary_date),
                        y: value.emoji_image_id,
                    })), 
    }
]
// console.log(data);
var date = new Date(2022,selectMonth,0).getDate();
// console.log(date);
const test = [1, 2, 3, 4, 5, 6 ];
const test1 = emojiImage?.map((value)=>(
        value.emoji_image
));
console.log(test);
console.log(test1);
    return (
        <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
        <ResponsiveLine
            data={
            monthData
                ? [
                    {
                    id: "diary",
                    data: monthData?.map((value) => ({
                        x: chartDateRender(value.diary_date),
                        y: value.emoji_image_id,
                    })),
                    },
                ]
                : [
                    // <div>dfd</div>
                ]
            }
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: 'time',
                     format: '%Y-%m-%d',
                     useUTC: false,
                     precision: 'day',
                     min : `2022-${selectMonth}-01`,
                     max : `2022-${selectMonth}-${date}`
                     }}
            xFormat="time:%Y-%m-%d"  
            axisBottom={{
                          format: '%m/%d',
                        //   tickValues: 'every 1 days',
                      }}       
            yScale={{
            type: "linear",
            min: "0",
            max: "6",
            // stacked: true,
            // reverse: false,
            }}
            axisLeft={{
            tickValues: ["a","b","c","d"],
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            }}
            colors={[ '#D4C8F2' ]}
            pointSize={7}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            // pointLabelYOffset={-12}
            areaBlendMode="multiply"
            // areaOpacity={0.15}
            useMesh={true}
        />
        </div>
    );
};

export default MonthLine;
