import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const YearLine = (props) => {
  const { selectYear } = props;

  const [yearData, setYearData] = useState();
  useEffect(() => {
    axios
      .get(`board/getYear/${selectYear}`)
      .then((res) => {
        setYearData(res.data);
      })
      .catch((error) => console.log(error));
  }, [selectYear]);

  return (
    <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
      <ResponsiveBar
        data={yearData ? yearData : []}
        indexBy="createMonth"
        keys={["angry", "sad", "suprise", "panic", "happy", "very_happy"]}
        minValue={0}
        maxValue={31}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 5,
          }}
        labelSkipHeight={12}
        tooltip={({ id, value, color }) => (
                    <div className="yearChartTooltip" style={{ color}}>
                        <span> {id}: {value} </span>
                    </div>
                )}

        // custom
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}

        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}


        //    legends={[
        //        {
        //            dataFrom: 'keys',
        //            anchor: 'bottom-right',
        //            direction: 'column',
        //            justify: false,
        //            translateX: 120,
        //            translateY: 0,
        //            itemsSpacing: 2,
        //            itemWidth: 100,
        //            itemHeight: 20,
        //            itemDirection: 'left-to-right',
        //            itemOpacity: 0.85,
        //            symbolSize: 20,
        //            effects: [
        //                {
        //                    on: 'hover',
        //                    style: {
        //                        itemOpacity: 1
        //                    }
        //                }
        //            ]
        //        }
        //    ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default YearLine;
