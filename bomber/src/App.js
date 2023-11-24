import { useEffect, useRef, useState } from "react";
import axios  from "axios";
import { Toaster, toast } from "react-hot-toast";

function App(){

  const [msg,setMsg] = useState(0);
  const[send,setSend] = useState(null);
  const [boolen, setBoolen] = useState(false);
  const iref = useRef();  
  const numbervalue = useRef()

  function sendmsg(){
    setBoolen(true);
    toast.success("bomber start")
    
  }

  function stopmsg(){
    setBoolen(false);
    toast.success("bomber stop")
  }

  useEffect(()=>{
   
   async function set(){

    if(boolen && msg <numbervalue.current.value){
         const data = await axios.post("http://localhost:9000",{
          email:iref.current.value
         });
    
     
         if(data.status == 200){
           setSend(data);
           setMsg(msg+1);
           if(msg == numbervalue.current.value-1){
            toast.success("target complted")
           }
         }
         else{
         toast.error("err:email is not defined")
         }
        }
        else{
          console.log("ok")
        }
 

    
   }
   set()


  },[send,boolen])
  


  return(
  
<div className=" w-full h-full justify-center items-center">
  <Toaster></Toaster>
<input type=" text" placeholder="enter target email" className=" p-2 rounded-sm font-mono outline outline-offset-2 outline-2 outline-blue-500" ref={iref} ></input>
<p className=" font-mono">message sent:{msg}</p>
<input type="number" className=" w-[50px] h-[30px] text-center rounded-sm font-mono outline outline-offset-2 outline-2  outline-green-700" ref={numbervalue}></input>
<button className=" w-[70px] h-[40px] bg-green-600 ml-3 rounded-md text-white font-mono" onClick={sendmsg}>send</button>
<button className=" w-[70px] h-[40px] bg-green-600 ml-3 rounded-md text-white font-mono" onClick={stopmsg}>stop</button>

</div>
  )
}

export default App;