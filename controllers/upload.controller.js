const path = require("path");
const Book_images = require("../models/book_images");
const fileExtensions = ["jpg", "png", "jpeg"];

const uploadFile = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  try {
    const files = Object.values(req.files);

    const filesUploaded = [];

    files.forEach((file) => {

      console.log(file.name);

      const imageName = file.name.split(".");

      const extension = imageName[imageName.length - 1];

      const route = path.join("/public/img/books", file.name);

      const uploadPath = path.join(__dirname, "../", route);

      if (!fileExtensions.includes(extension)) {
        return res
          .status(400)
          .json({ msg: `${extension} is not a valid file` });
      }

      file.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ err });
        }
        filesUploaded.push(route);
      });
    });

    req.body.filesUploaded = filesUploaded;

    // res.status(200).json({msg:"File uploaded", path:filesUploaded});

    next();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = { uploadFile };
