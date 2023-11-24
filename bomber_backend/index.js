

const express = require("express");
const nodemailer = require("nodemailer");
const server = express();
const cors = require("cors");
server.use(cors())
server.use(express.json())

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"hackx0315@gmail.com",
        pass:"shgmjanxolnjgesa"
    }
})

function randomotp(){
    const value = "1234567890";
    let otp = "";
    for(i=0; i<8; i++){
        otp = otp + Math.floor(Math.random()*10);
    }
    return otp;
}

server.get("/",(req,res)=>{
    res.send("helo bomber app")
})

server.post("/",async(req,res)=>{
   try{
    const otp = randomotp()
    const message = await transporter.sendMail({
        from:"hackx0315@gmail.com",
       to:req.body.email,
       subject:"otp",
       text: `your otp is ${otp}`
     })
     res.status(200).json({id:message.messageId})
   }
   catch(error){
    res.status(203).json({id:"inavlid email"})
   }
})

server.listen(9000,()=>{
    console.log('start')
})