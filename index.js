 
const express = require("express");
const app = express();
var captchapng = require('captchapng');
const { generateJwt, decodeJwt } = require("./jwt");  
var bodyParser = require('body-parser');
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())


const generateCaptcha= async(expiresIn=null)=>{
    var n =parseInt(Math.random()*9000+1000);
    // encript n 
   const { error, token } = await generateJwt({code:n},{  expiresIn:expiresIn || "300s" }); // 5 minutes

   if (error)   return{ error:true, message:"token_error"  };   


   var p = new captchapng(80,30,n); // width,height,numeric captcha
   p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
   p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

   var img = p.getBase64();
   //var imgbase64 = new Buffer.from(img,'base64'); 
   return {  img:img,   token:token  };

}
const verifyCaptcha= async(code,token)=>{
     
 
    const { error, decoded,message } = await decodeJwt(token); // fifteen minutes
 
    if (error) {
     // return res.status(500).json({
        return  {
          error: true,
          message:message
      } ;
    }
  
 
   

    if(decoded.code!=code){
        return  {
            error: true,
            message:"invalid_code"
        } ;
    }

      (decoded);
      return {error:false}
  

}



app.get("/",async function(req, res) { 
 
   const captcha = await generateCaptcha("60s");

   res.send(`
   <img src="data:image/png;base64,${captcha.img}"/>

   <form method="POST" action="/verify">
   <input name="token" type="hidden" value="${captcha.token}"/>
   <input name="code" type="text" value=""/>
   <button type="submit">Submit</button>
   </form>
 
   
   
   `); 
    });
  

    app.post("/verify",async function(req, res) { 
       var verification = await verifyCaptcha(req.body.code,req.body.token); 
       if(verification.error){
        return res.send({error:true,message:verification.message}); 
       }

        return res.send("verification ok");
    });


  app.listen(port, function() {
      console.log("Server is running on Port: " + port);
    });


  