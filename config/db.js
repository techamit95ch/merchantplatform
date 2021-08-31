const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const { PORT, DEBUG_MODE, DB_URL } = process.env;

module.exports = function (app) {
  try {
    // console.log(DB_URL);
    mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() =>
        app.listen(PORT, () =>
          console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
      )
      .catch((error) => console.log(`${error.message} did not connect`));

    // mongoose.set('useFindAndModify', false);
  } catch (err) {
    console.error(err.message);
  }
  // mongoose.connect({});
};
