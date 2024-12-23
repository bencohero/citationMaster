"use client"
import React from 'react'
import { Button } from './ui/button';

export default function ShareButton(props: {citation : {
    text: string;
    author: string;

}}) {
    const handleShare = () =>{
        if(navigator.share){
            navigator.share({
                title: "Citation",
                text: props.citation?.text,
                url: window.location.href
                });
        }
      }
  return (
    <Button onClick={handleShare} className="mt-4"> Partager </Button>
  )
}
