import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { chartDateRender } from "../../../utils/index";

const MonthLine = (props) => {
    const { selectMonth } = props;
    const [monthData, setMonthData] = useState();
    const getMoodGrap = null;

    useEffect(() => {
        axios
        .get(`/board/getMonth/${selectMonth}`)
        .then((res) => {
            setMonthData(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);

    // console.log(monthData);
const test = [
    { value : "2022-09-01T15:00:00.000Z",
     value : "2022-09-02T15:00:00.000Z",
     value : "2022-09-03T15:00:00.000Z",
     value : "2022-09-04T15:00:00.000Z",
     value : "2022-09-05T15:00:00.000Z",
     value : "2022-09-06T15:00:00.000Z"}
]
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
console.log(data);
    return (
        <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
        <ResponsiveLine
            data={
            monthData
                ? [
                    {
                    id: "diary",
                    data: monthData?.map((value) => ({
                        // x: test?.map((v)=>(
                        //     v.value
                        // )),
                        x: chartDateRender(value.diary_date),
                        y: value.emoji_image_id,
                    })),
                    },
                ]
                : []
            }
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: 'time',
                     format: '%Y-%m-%d',
                     useUTC: false,
                     precision: 'day' }}
            xFormat="time:%Y-%m-%d"  
            axisBottom={{
                          format: '%m/%d',
                          tickValues: 'every 5 days',
                      }}       
            yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
            }}
            axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            }}
            pointSize={7}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
        />
        </div>
    );
};

export default MonthLine;
