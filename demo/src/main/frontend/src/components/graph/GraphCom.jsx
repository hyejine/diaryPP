import { useState } from 'react';
import MonthGrap from './MonthGrap';
import YearGrap from './YearGrap';
import './graphCom.scss'

const Graph =() => {
    const [grapType, setGrapType] = useState();

    const handleChange = (value)=>{
        setGrapType(value.target.value);
    }
        return (
            <div id='grapPage'>
                <select onChange={handleChange}>
                    <option value ="months">월간 그래프</option>
                    <option value ="year">연간 그래프</option>
                </select>
                {grapType === "year" ? <YearGrap/> : <MonthGrap/>}
            </div>
        );
  
}

export default Graph;