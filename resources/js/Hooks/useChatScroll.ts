import { RefObject, useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef:RefObject<HTMLDivElement>;
    bottomRef:RefObject<HTMLDivElement>;
    count?:number;
}

export const useChatScroll = (props:ChatScrollProps) =>{
    const {chatRef,
        bottomRef,
        count=0
    }=props;
    const [hasInitialized,setHasInitialized] = useState(false);
    

    useEffect(()=>{
        const bottomDiv = bottomRef.current;
        const topDiv = chatRef.current;

        const shouldAutoScroll = () =>{
            if(!hasInitialized && bottomDiv){
                setHasInitialized(true);
                return true;
            }
            if(!topDiv){
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <=100;
        }

        if(shouldAutoScroll()){
            setTimeout(()=>bottomRef.current?.scrollIntoView({
                behavior:'smooth'
            }),100);
        }

    },[bottomRef,chatRef,hasInitialized,count]);
}