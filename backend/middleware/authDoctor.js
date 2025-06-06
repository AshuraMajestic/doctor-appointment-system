import jwt from 'jsonwebtoken'

// Doctor authentication middlware
const authDoctor = async(req, res, next) => {
  try {
    // Get the token from the Authorization header using Bearer scheme
    const {dtoken} = req.headers
    
    if (!dtoken) {
      return res.json({success: false, message: "Not Authorized Login Again"})
    }
    
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    
    // Set doctorId in req.user instead of req.body - this is cleaner
    req.user = { docId: token_decode.id }
    next()
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}
 export default authDoctor;