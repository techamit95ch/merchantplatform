import mongoose from 'mongoose';
import Auth from '../models/auth.js';
import upload from '../middleware/upload.js';
import multer from 'multer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export const signIn = async (req, res) => {
  try {
    const cpUpload = upload.single('img');
    await cpUpload(req, res, async function (err) {
      const url = req.protocol + '://' + req.get('host');
      if (err instanceof multer.MulterError) {
        res.status(400).json({ success: false, message: err.code });
      } else if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      const { name, email, password } = req.body;
      const img = url + '/uploads/' + req.file.filename;
      const random = Math.floor(Math.random() * 2048) + 1024;

      const randomString = encrypt(email + random);
      console.log('random string ', randomString);
      // const body = req.body;
      const user = await Auth.findOne({ email: email });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const login = await Auth.findByIdAndUpdate(user._id, {
            isLoggedIn: true,
            randomString: random,
          })
            .then((doc) => {
              console.log(doc);

              res.status(201).json({
                success: true,
                data: { name: doc.name, img: doc.img, email: doc.email },
                randomString: randomString,
              });
            })
            .catch((err) => {
              console.error(err);
              res.status(400).json({ success: false, message: err.message });

              // res.status(400);
            });
        } else {
          res.status(401).json({ success: false, message: 'Invalid Password' });

          // res.status(400).json({ error: 'Invalid Password' });
        }
      } else {
        console.log('from else here');
        // New Auth
        const newAuth = new Auth({
          name: name,
          email: email,
          img: img,
          password: password,
          randomString: random,
          isLoggedIn: true,
        });
        const salt = await bcrypt.genSalt(10);

        newAuth.password = await bcrypt.hash(newAuth.password, salt);
        await newAuth
          .save()
          .then((doc) => {
            // console.log(doc);
            // console.log(randomString);
            res.status(200).json({
              success: true,
              data: { name: doc.name, img: doc.img, email: doc.email },
              randomString: randomString,
            });
          })
          .catch((err) => {
            res.status(400).json({ success: false, message: err.message });
          });
      }

      // console.log(req.file);
      // console.log(req.body);
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const logIn = async (req, res) => {
  const random = Math.floor(Math.random() * 2048) + 1024;

  const { email, password } = req.body;
  const randomString = encrypt(email + random);
  const user = await Auth.findOne({ email: email });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const login = await Auth.findByIdAndUpdate(user._id, {
        isLoggedIn: true,
        randomString: random,
      })
        .then((doc) => {
          console.log(doc);
          res.status(200).json({
            success: true,
            data: { name: doc.name, img: doc.img, email: doc.email },
            randomString: randomString,
          });
          // res.status(200).json({ message: 'Valid password' });
        })
        .catch((err) => {
          console.error(err);
          res.status(400);
        });
    } else {
      res.status(400).json({ success: false, message: 'Invalid Password' });
    }
  }
};
export const isLoggedIn = async (req, res) => {
  try {
    // const cpUpload = upload;
    // await cpUpload(req, res, async function (err) {
    // const { iv, encryptedData } = req.body;
    console.log(req.body);
    const { email } = req.body;

    // const random = decrypt(req.body);
    const exists = await Auth.exists({
      email: email,
      isLoggedIn: true,
    });
    console.log(exists);
    // if (exists) {
    res.status(200).json({ success: exists });
    // }
    // });
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = async (req, res) => {
  const { email } = req.body;
  // console.log(decrypt(req.body.randomString));
  // const random = decrypt(req.body.randomString);

  const user = await Auth.findOne({ email: email });
  console.log(req.body);
  const logout = await Auth.findByIdAndUpdate(user._id, {
    isLoggedIn: true,
  })
    .then(() => res.status(200).json({ logOut: true }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};
