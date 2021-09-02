import multer from 'multer';
import path from 'path'; // for getting file extension
// import uuidv4 from 'uuidv4'; // for naming files with random characters
const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },

  filename: function (req, file, cb) {
    // const fileName = file.originalname.toLowerCase().split(' ').join('-');

    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});
// const upload = multer({ storage: storage });
export default upload;
