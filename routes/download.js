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

    if (!jpeg) {
      logger.error(`DOWNLOAD :: id ${jpegId} not found`);
      res.status(404).json({ error: `id ${jpegId} not found` });
      return;
    }

    logger.info(`DOWNLOAD :: ${jpegId}`);
    res.type('image/jpeg');
    res.status(200).download(path.resolve(images, jpeg.id));
  } catch (error) {
    logger.error(`DOWNLOAD :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
