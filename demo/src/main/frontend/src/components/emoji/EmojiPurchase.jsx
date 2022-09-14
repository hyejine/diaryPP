import React, { Component, useState } from "react";
import { useEffect } from "react";
import "./emoji.scss";
import axios from "axios";

const EmojiPurchase = () => {
    const [ emojiList, setEmojiList] =useState();
    useEffect(()=>{
        axios.get('/emoji/getEmojiList')
        .then(response => setEmojiList(response.data))
        .catch(error => console.log(error))
    },[])
    console.log(emojiList);
  return (
    <div className="emojiPage">
      <h1 className="title">프리미엄 이모지💸💸💸</h1>
      <div className="emojiListWrap">
        {emojiList?.map((value)=>(
            <div className="emojiList">
                {console.log(value.emoji_type)}
                {value.emoji_type?.map((list)=>(
                    list.emoji_image
                ))}
                {value.emoji_price}
            </div>
            
        ))}
      </div>
    </div>
  );
};

export default EmojiPurchase;
