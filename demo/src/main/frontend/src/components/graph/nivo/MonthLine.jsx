import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

const MonthLine = (props) => {
    const { selectMonth } = props;
    const [monthData, setMonthData] = useState();

    const test = [
        monthData?.map((value, index)=>{
            console.log(index);
            console.log(value.diary_date);
            return {
               
                id: "value.diary_id", 
                data : [
                    {x: `${value.diary_date}`,
                    y: `${value.emoji_image_id}`
                    }
                ]
            
            };
        })
    ]
    const data = [
        {
        id: "japan",
        // color: "hsl(5, 70%, 50%)",
        data: [
            {
            x: "10.01",
            y: 120,
            },
            {
            x: "10.06",
            y: 94,
            },
            {
            x: "10.11",
            y: 182,
            },
        ],
        },
        {
            id: "japan",
        // color: "hsl(102, 70%, 50%)",
        data: [
            {
            x: "10.01",
            y: 274,
            },
            {
            x: "10.06",
            y: 17,
            },
            {
            x: "10.11",
            y: 59,
            },
        ],
        },
    ];
   
    useEffect(() => {
        axios
        .get(`/board/getMonth/${selectMonth}`)
        .then((res) => {
            setMonthData(res.data);
        })
        .catch((error) => console.log(error));
    }, [selectMonth]);
    console.log("ef??");
    console.log(monthData);
    return (
        <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
        <ResponsiveLine
            data={data}
            // data={
            // monthData &&
            // monthData?.map((value, index) => {
            //     return {
            //     id: index,
            //     color: "hsl(102, 70%, 50%)",
            //     data: [
            //         {
            //         x: value.diary_date,
            //         y: value.emoji_image_id,
            //         },
            //     ],
            //     };
            // })
            // }
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
            }}
            // yFormat=" >-.2f"
            // axisTop={null}
            // axisRight={null}
            axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
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
            // legends={[
            //   {
            //     anchor: "bottom-right",
            //     direction: "column",
            //     justify: false,
            //     translateX: 100,
            //     translateY: 0,
            //     itemsSpacing: 0,
            //     itemDirection: "left-to-right",
            //     itemWidth: 80,
            //     itemHeight: 20,
            //     itemOpacity: 0.75,
            //     symbolSize: 12,
            //     symbolShape: "circle",
            //     symbolBorderColor: "rgba(0, 0, 0, .5)",
            //     effects: [
            //       {
            //         on: "hover",
            //         style: {
            //           itemBackground: "rgba(0, 0, 0, .03)",
            //           itemOpacity: 1,
            //         },
            //       },
            //     ],
            //   },
            // ]}
        />
        </div>
    );
};

export default MonthLine;
