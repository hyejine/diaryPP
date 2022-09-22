import React from 'react';
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";

const Edit =()=>{
    useEffect(() => {
        axios
          .get(`/board/getBoard`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }, []);
        return (
            <div>
                
            </div>
        );
    
}

export default Edit;