import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { chartDateRender } from "../../../utils/index";
import noneData from "../../../utils/nivoChart";

const MonthLine = (props) => {
    const { selectMonth } = props;
    const date = new Date(2022,selectMonth,0).getDate();
    const [monthData, setMonthData] = useState();

    useEffect(() => {
        axios
        .get(`/board/getMonth/${selectMonth}`)
        .then((res) => {
            setMonthData(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);

    

    return (
        <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
        <ResponsiveLine
            data={
            monthData?.length > 0 ? 
                [
                    {
                    id: "diary",
                    data: monthData?.map((value) => ({
                        x: chartDateRender(value.diary_date),
                        y: value.emoji_image_id,
                    })),
                    },
                ]
                : 
                noneData(selectMonth)   
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
            max: "6"
            }}
            axisLeft={{
                tickValues: ["1","2","3","4","5","6"],
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            // custom
            enableArea={true}
            theme={{
                fontFamily : 'DungGeunMo',
                textColor : "#333333",
                fontSize: 14,
            }}
            colors={[ '#D4C8F2' ]}
            pointSize={7}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            areaBlendMode="multiply"
            areaOpacity={0.15}
            useMesh={true}
        />
        </div>
    );
};

export default MonthLine;
