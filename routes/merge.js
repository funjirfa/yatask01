const fs = require("fs");
const path = require("path");

const { replaceBackground } = require("backrem");
const logger = require('../logger');
const db = require('../core/database');
const { images } = require('../config');


module.exports = async (req, res) => {
  const { front, back, color, threshold } = req.query;
  if (!front || !back) {
    logger.error('MERGE :: front or back image is missing');
    res.status(400).json({ reason: 'front or back image is missing' });
    return;
  }

  const jpegFront = db.findOne(front);
  const jpegBack = db.findOne(back);
  if (!jpegFront || !jpegBack) {
    logger.error('MERGE :: front or back image is not found');
    res.status(400).json({ reason: 'front or back image is not found' });
    return;
  }

  if ((jpegFront.width !== jpegBack.width) || (jpegFront.height !== jpegBack.height)) {
    logger.error('MERGE :: images dimensions are not equal');
    res.status(400).json({ reason: 'images dimensions are not equal' });
    return;
  }

  try {
    const imgFront = fs.createReadStream(
      path.resolve(images, front)
    );

    const imgBack = fs.createReadStream(
      path.resolve(images, back)
    );

    replaceBackground(imgFront, imgBack, color ? color.split(',').map(Number) : [255, 0, 0], threshold || 0).then(
      (readableStream) => {
        // const writableStream = fs.createWriteStream(
        //   path.resolve(__dirname, "./result/result.jpg")
        // );

        logger.info(`MERGE :: ${front} + ${back}`);
        res.header('Content-Type', 'image/jpeg');
        res.type('image/jpeg');
        readableStream.pipe(res);
      }
    );
  } catch (error) {
    logger.error(`MERGE :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
