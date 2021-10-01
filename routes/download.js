const path = require('path');

const logger = require('../logger');
const db = require('../core/database');
const { images } = require('../config');


module.exports = async (req, res) => {
  if (!req.params.id) {
    logger.error('DOWNLOAD :: Empty file ID');
    res.status(400).json({ error: ' empty file id' });
    return;
  }

  try {
    const jpegId = req.params.id;
    const jpeg = await db.findOne(jpegId);
    logger.info(`DOWNLOAD :: ${jpegId}`);
    res.status(200).download(path.resolve(images, jpeg.id));
  } catch (error) {
    logger.error(`DOWNLOAD :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
