import jwt from 'jsonwebtoken'

// Admin authentication middlware
const adminAuth = async (req,res,next) =>{

 try {
  const {atoken} = req.headers

  if(!atoken){
    return res.json({sucess : false , message : "Not Authorized Login Again"})
  }
  const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

  if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWOD) {
    return res.json({sucess : false , message : "Not Authorized Login Again"})
  }

  next()

 } catch (error) {
  console.log(error)
  res.json({sucess : false , message : error.message})
 }

 }
 export default adminAuth;