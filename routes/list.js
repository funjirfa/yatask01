const logger = require('../logger');
const db = require('../core/database');


module.exports = async (req, res) => {
  try {
    const allJpeg = await db.find();
    logger.info('LIST :: Read all images data');
    res.status(200).json(allJpeg);
  } catch (error) {
    logger.error(`LIST :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
