import  cloudinary from 'cloudinary';
import { config } from 'dotenv';
config()
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECURITE 
});
  export default cloudinary.v2