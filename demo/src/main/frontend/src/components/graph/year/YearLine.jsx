import React from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { useEffect } from 'react';
import axios from 'axios';

const YearLine = (props) => {
    const {selectYear} = props;

    // console.log(selectYear);

    const data = [
        {
            "country": "AD",
            "hot dog": 97,
            "hot dogColor": "hsl(73, 70%, 50%)",
            "burger": 52,
            "burgerColor": "hsl(67, 70%, 50%)",
            "sandwich": 114,
            "sandwichColor": "hsl(185, 70%, 50%)",
            "kebab": 41,
            "kebabColor": "hsl(17, 70%, 50%)",
            "fries": 191,
            "friesColor": "hsl(80, 70%, 50%)",
            "donut": 62,
            "donutColor": "hsl(190, 70%, 50%)"
          },
          {
            "country": "AE",
            "hot dog": 115,
            "hot dogColor": "hsl(277, 70%, 50%)",
            "burger": 157,
            "burgerColor": "hsl(10, 70%, 50%)",
            "sandwich": 90,
            "sandwichColor": "hsl(208, 70%, 50%)",
            "kebab": 116,
            "kebabColor": "hsl(244, 70%, 50%)",
            "fries": 68,
            "friesColor": "hsl(183, 70%, 50%)",
            "donut": 1,
            "donutColor": "hsl(180, 70%, 50%)"
          },
          {
            "country": "AF",
            "hot dog": 171,
            "hot dogColor": "hsl(291, 70%, 50%)",
            "burger": 170,
            "burgerColor": "hsl(75, 70%, 50%)",
            "sandwich": 30,
            "sandwichColor": "hsl(354, 70%, 50%)",
            "kebab": 154,
            "kebabColor": "hsl(79, 70%, 50%)",
            "fries": 21,
            "friesColor": "hsl(285, 70%, 50%)",
            "donut": 130,
            "donutColor": "hsl(295, 70%, 50%)"
          },
          {
            "country": "AG",
            "hot dog": 74,
            "hot dogColor": "hsl(194, 70%, 50%)",
            "burger": 89,
            "burgerColor": "hsl(243, 70%, 50%)",
            "sandwich": 100,
            "sandwichColor": "hsl(302, 70%, 50%)",
            "kebab": 195,
            "kebabColor": "hsl(5, 70%, 50%)",
            "fries": 102,
            "friesColor": "hsl(252, 70%, 50%)",
            "donut": 62,
            "donutColor": "hsl(334, 70%, 50%)"
          }
]

    useEffect (()=>{
      axios.get(`board/getYear/${selectYear}`)
      .then((res) => {
        console.log(res.data);
        // setMonthData(res.data);
    })
    .catch((error) => console.log(error));
    }, []);
console.log(data);
    return (
        <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
       <ResponsiveBar
       data={data}
       indexBy="date"
       keys={[
           'angry',   // 이모지 기분이 되야함 
           'sad',
           'suprise',
           'panic',
           'happy',
           'very_happy'
       ]}
       minValue={0}
    //    maxValue={31}
    //    valueFormat ={"%"} 

       defs={[
           {
               id: 'dots',
               type: 'patternDots',
               background: 'inherit',
               color: '#38bcb2',
               size: 4,
               padding: 1,
               stagger: true
           },
           {
               id: 'lines',
               type: 'patternLines',
               background: 'inherit',
               color: '#eed312',
               rotation: -45,
               lineWidth: 6,
               spacing: 10
           }
       ]}
       fill={[
           {
               match: {
                   id: 'fries'
               },
               id: 'dots'
           },
           {
               match: {
                   id: 'sandwich'
               },
               id: 'lines'
           }
       ]}
       axisBottom={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
       }}
       axisLeft={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
       }}
       labelSkipHeight={12}

       // custom 
       margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
       padding={0.3}
       colors={{ scheme: 'nivo' }}
       labelTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                1.6
            ]
        ]
    }}
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
       barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
        </div>
    );
};

export default YearLine;