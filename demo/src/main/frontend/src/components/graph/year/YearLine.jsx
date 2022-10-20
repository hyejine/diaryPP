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
      },
      {
        "country": "AI",
        "hot dog": 66,
        "hot dogColor": "hsl(69, 70%, 50%)",
        "burger": 45,
        "burgerColor": "hsl(231, 70%, 50%)",
        "sandwich": 136,
        "sandwichColor": "hsl(137, 70%, 50%)",
        "kebab": 189,
        "kebabColor": "hsl(178, 70%, 50%)",
        "fries": 113,
        "friesColor": "hsl(155, 70%, 50%)",
        "donut": 151,
        "donutColor": "hsl(1, 70%, 50%)"
      },
      {
        "country": "AL",
        "hot dog": 16,
        "hot dogColor": "hsl(104, 70%, 50%)",
        "burger": 100,
        "burgerColor": "hsl(44, 70%, 50%)",
        "sandwich": 83,
        "sandwichColor": "hsl(312, 70%, 50%)",
        "kebab": 38,
        "kebabColor": "hsl(141, 70%, 50%)",
        "fries": 84,
        "friesColor": "hsl(260, 70%, 50%)",
        "donut": 69,
        "donutColor": "hsl(75, 70%, 50%)"
      },
      {
        "country": "AM",
        "hot dog": 157,
        "hot dogColor": "hsl(30, 70%, 50%)",
        "burger": 33,
        "burgerColor": "hsl(302, 70%, 50%)",
        "sandwich": 67,
        "sandwichColor": "hsl(161, 70%, 50%)",
        "kebab": 7,
        "kebabColor": "hsl(106, 70%, 50%)",
        "fries": 197,
        "friesColor": "hsl(328, 70%, 50%)",
        "donut": 8,
        "donutColor": "hsl(294, 70%, 50%)"
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
       keys={[
           'hot dog',
           'burger',
           'sandwich',
           'kebab',
           'fries',
           'donut'
       ]}
       indexBy="country"
       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
       padding={0.3}
       valueScale={{ type: 'linear' }}
       indexScale={{ type: 'band', round: true }}
       colors={{ scheme: 'nivo' }}
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
       borderColor={{
           from: 'color',
           modifiers: [
               [
                   'darker',
                   1.6
               ]
           ]
       }}
       axisBottom={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
           legend: 'country',
           legendPosition: 'middle',
           legendOffset: 32
       }}
       axisLeft={{
           tickSize: 5,
           tickPadding: 5,
           tickRotation: 0,
           legend: 'food',
           legendPosition: 'middle',
           legendOffset: -40
       }}
       labelSkipWidth={12}
       labelSkipHeight={12}
       labelTextColor={{
           from: 'color',
           modifiers: [
               [
                   'darker',
                   1.6
               ]
           ]
       }}
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
       role="application"
       ariaLabel="Nivo bar chart demo"
       barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
        </div>
    );
};

export default YearLine;