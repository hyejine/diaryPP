import React from 'react';
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";

const Edit =()=>{
  const [test, setTest] = useState();
    useEffect(() => {
        axios
          .get(`/board/getBoard`)
          .then((res) => {
            console.log(res.data);
            setTest(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
        return (
            <div>
                {test?.map((value)=>(
                  <div>
                    {value.id}
                    <div dangerouslySetInnerHTML={{ __html: value.diary_content }} />
                    {/* {value.diary_content} */}

                    </div>
                  ))}
            </div>
        );
    
}

export default Edit;