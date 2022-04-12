# nodejs-captcha  

Simple server side captcha system  
 
-Flow  
--Generate catpcha  
1-Generate a random code.  
2-Generate a captcha image with "captchapng" Showing the code.  
3-Encrypt the value with "jsonwebtoken", aditionally set expiration time.  
4-When requested, send the encripted token and the generated image as base64.  

--Verify captcha  
1-Decrypt the token and compare it with the code sent.  
2-Do whatever with the result.  
  
  
 -.env contents  
 JWT_SECRET = [YOUR SECRECT KEY FOR JWT]  
