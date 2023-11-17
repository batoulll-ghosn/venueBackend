const cloudinary = require("../config/cloud");

exports.imageUploader = async (file) => {
  const base644 = file.buffer.toString("base64");
  // data:file.mimetype;base64,valueOfb64
  const data = `data:${file.mimetype};base64,${base644}`;
  const result = await cloudinary.uploader.upload(data, {
    resource_type: "auto",
  });
  return result?.url;
};
