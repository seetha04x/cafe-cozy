const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudName = process.env.CLOUD_NAME;
const cloudApiKey = process.env.CLOUD_API_KEY;
const cloudApiSecret = process.env.CLOUD_API_SECRET;

if (cloudName && cloudApiKey && cloudApiSecret) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: cloudApiKey,
        api_secret: cloudApiSecret,
    });
}

const storage = cloudName && cloudApiKey && cloudApiSecret
    ? new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "CafeCozy",
            allowed_formats: ["png", "jpg", "jpeg"],
        },
    })
    : undefined;

module.exports = { cloudinary, storage };
