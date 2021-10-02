const logger = require('../logger');
const Jpeg = require('../core/jpeg');
const db = require('../core/database');


module.exports = async (req, res) => {
  try {
    const jpeg = new Jpeg(req.file);
    await db.insert(jpeg);
    logger.info(`UPLOAD :: ${jpeg.id}`);
    res.status(201).json({id: jpeg.id});
  } catch (error) {
    logger.error(`UPLOAD :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
