const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/img/books"));
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    req.body.img = [
      {
        ruta: `/img/books/${name}`,
      },
    ];

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: diskStorage });

module.exports = {
  upload: upload.array("image"),
};
