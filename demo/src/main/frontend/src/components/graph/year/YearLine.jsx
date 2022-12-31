import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const YearLine = (props) => {
  const { selectYear, fontChange, currentUser } = props;
  const [yearData, setYearData] = useState();

  useEffect(() => {
    axios
      .get(`board/getYear/${selectYear}/${currentUser?.email}`)
      .then((res) => {
        setYearData(res.data);
      })
      .catch((error) => console.log(error));
  }, [selectYear]);

  console.log(selectYear);
  const color = [
    {
        color: "#c2a1da"
    },
    {
        color: "#ccb2d5"
    },
    {
        color: "#e9d0e5"
    },
    {
        color: "#b6b2d7"
    },
    {
        color: "#feeae9"
    },
    {
        color: "#f8cad7"
    }

  ]

  return (
    <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
      <ResponsiveBar
        data={yearData ? yearData : []}
        indexBy="createMonth" 
        keys={["angry", "sad", "surprise", "panic", "happy", "very_happy"]}
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
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        theme={{
          fontFamily : `${fontChange}`,
          textColor : "#333333",
          fontSize: 14,
      }}
        colors={color.map((c) => c.color)}
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
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
};

export default YearLine;
