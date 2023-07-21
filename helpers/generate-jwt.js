const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Can't generate token");
        } else {
          // console.log(token)
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
