import {v2 as cloudinary} from 'cloudinary'

const connectcloudinary = async() =>{
  cloudinary.config ({

    clod_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_seret : process.env.CLOUDINARY_SECRET_KEY
  })
}

export default connectcloudinary