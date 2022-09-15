import React, { Component, useState } from "react";
import { useEffect } from "react";
import "./emoji.scss";
import axios from "axios";

const EmojiPurchase = () => {
    const [ emojiList, setEmojiList] =useState();
    
    const onEmojiBuy = ()=>{
      
    }

    useEffect(()=>{
        axios.get('/emoji/getEmojiList')
        .then(response => setEmojiList(response.data))
        .catch(error => console.log(error))
    },[])
    
  return (
    <div className="emojiPage">
      <h1 className="title">프리미엄 이모지💸💸💸</h1>
      <div className="emojiListWrap">
        {emojiList?.map((value)=>(
            <div className="emojiList">
              <div className="listWrap">
                {value.emoji_type?.map((list)=>(
                   <img src ={list.emoji_image} /> 
                ))}
                <button className="emojiPrice" onClick={onEmojiBuy}>{value.emoji_price.toLocaleString('ko-KR')}원</button>
            </div>
            </div>
            
        ))}
      </div>
    </div>
  );
};

export default EmojiPurchase;
