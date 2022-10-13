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

    console.log(monthData);

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
                : []
            }
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
        />
        </div>
    );
};

export default MonthLine;
