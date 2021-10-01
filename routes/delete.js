const logger = require('../logger');
const db = require('../core/database');


module.exports = async (req, res) => {
  if (!req.params.id) {
    logger.error('DELETE :: Empty file ID');
    res.status(400).json({ error: ' empty file id' });
    return;
  }

  try {
    const jpegId = req.params.id;
    await db.remove(jpegId);
    logger.info(`DELETE :: ${jpegId}`);
    res.status(200).json({ id: jpegId });
  } catch (error) {
    logger.error(`DELETE :: ${error.name} * ${error.message}`);
    res.status(500).json({ reason: `${error.name} :: ${error.message}` });
  }
};
