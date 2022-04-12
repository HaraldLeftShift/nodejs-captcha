const jwt = require("jsonwebtoken"); // to generate
const jwt_decoder = require('jwt-decode');  // to

require("dotenv").config();

 

async function generateJwt(payload,options) {
  try {
    //const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (error) { 
     console.log(error);
     return { error: true,message:error };

  }
}



async function decodeJwt(token) {
  try {
    const decoded =   jwt_decoder(token); // Decoding

    if(Math.round(Date.now()/1000)>decoded.exp){
      return  { error: true,  message:"token_expired"  } ;
     }

    return {decoded:decoded};
  } catch (error) { 
    console.log(error);
    return { error: true,message:error };
  }
}




 
module.exports = { generateJwt, decodeJwt };
