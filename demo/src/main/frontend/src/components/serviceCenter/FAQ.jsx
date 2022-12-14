import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import  Pagination  from '../common/CommonPagination';
const FAQ = () => {
  const { register, handleSubmit } = useForm();
  const [ allList, setAllList ] = useState();

  const onSubmit = (value) => {
    console.log(value);

    axios.post('/faq/searchData',value)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    axios.get('/faq/getAllFaq')
    .then(res=>{
      setAllList(res.data);
    })
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className="contactUsTap pixelBorder">
      <div className='faqSearchD'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select className='faqSelectB' {...register("selectContent")}>
          <option value ="all">전체</option>
            <option value ="title">제목</option>
            <option value ="content">내용</option>
          </select>
          <select className='faqSelectB' {...register("selectCategory")}>
          <option value="category">카테고리</option>
            <option value ="login">로그인 문의</option>
            <option value ="calendar">캘린더 문의</option>
            <option value ="custom">커스텀 문의</option>
            <option value ="diary">다이어리 문의</option>
          </select>
          <input
            className="faqSearchI" placeholder="궁금하신 내용을 입력해주세요."
            {...register("searchKeyWord")} />
          <button type="submit" className="faqSubmit" >검색</button>
        </form>
      </div>
      <div className='faqAccordionD'>
        <Accordion >
          { allList ? allList.map((value, index)=>(
            <div key={index}>
              <Accordion.Item eventKey={index}>
              <Accordion.Header><span>[{value.faq_category}]</span><sapn>{value.faq_category}</sapn></Accordion.Header>
              <Accordion.Body><span>{value.faq_content}</span></Accordion.Body>
              </Accordion.Item>
            </div>
          ))  : 
          <div>
          
          </div>
          }
        </Accordion>
      </div>
      <div className='faqPaginationD'>
        <Pagination/>
      </div>
    </div>
  );
};

export default FAQ;