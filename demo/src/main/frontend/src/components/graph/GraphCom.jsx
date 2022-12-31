import { useState } from 'react';
import MonthGrap from './month/MonthGrap';
import YearGrap from './year/YearGrap';
import './graphCom.scss'

const Graph =(props) => {
    const {currentUser, fontChange} = props;
    const [grapType, setGrapType] = useState();

    const handleChange = (value)=>{
        setGrapType(value.target.value);
    }
        return (
            <div id='grapPage'>
                <select onChange={handleChange} className="selectOp">
                    <option value ="months">월간 그래프</option>
                    <option value ="year">연간 그래프</option>
                </select>
                {grapType === "year" ? <YearGrap currentUser={currentUser} fontChange={fontChange}/> : <MonthGrap currentUser={currentUser} fontChange={fontChange}/>}
            </div>
        );
  
}

export default Graph;