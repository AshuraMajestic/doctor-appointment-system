import multer from 'multer'

const storage = multer.diskStorage({
  filename : function(req,filename,callback){
    callback(null,filename.originalname)
  }
})

const uplod = multer({storage})

export default uplod