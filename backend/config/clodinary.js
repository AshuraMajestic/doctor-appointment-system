import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,       // 🔁 fixed `clod_name` → `cloud_name`
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY  // 🔁 fixed `api_seret` → `api_secret`
  });
};

export default connectCloudinary;
