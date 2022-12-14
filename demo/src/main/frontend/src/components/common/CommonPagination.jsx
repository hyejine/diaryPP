import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap';

const CommonPagination =()=> {
    const [ active, setActive ] = useState(1);

    const onPagination =(value)=>{
        console.log(value.target);
        setActive()
      }
    
      let items = [];
      for (let number = 1; number <= 5; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active} onClick={onPagination}>
            {number}
          </Pagination.Item>,
        );
      }
    return (
      <div>
                <Pagination>
        <Pagination.Prev />
        {items}
        <Pagination.Next />
        </Pagination>
      </div>
    )
  }
export default CommonPagination;