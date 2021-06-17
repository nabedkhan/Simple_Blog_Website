const path = require("path");

const uploadMiddleware = (req, res, next) => {
  if (!req.files || req.files.thumbnail === 0) {
    throw new Error("No files were upload!");
  }
  let file = req.files.thumbnail;
  // edit file name
  const fileName = `${Date.now()}-${file.name}`;
  // server folder path
  const uploadPath = path.join(
    `${path.dirname(__dirname)}/uploads/${fileName}`
  );
  //file move in server folder
  file.mv(uploadPath, (err) => {
    if (err) {
      throw new Error(err.message);
    } else {
      req.thumbnail = fileName;
      next();
    }
  });
};

module.exports = uploadMiddleware;
