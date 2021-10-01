const fs = require('fs');
const util = require('util');

const logger = require('../logger');


const writeFileAsync = util.promisify(fs.writeFile);
const unlinkFileAsync = util.promisify(fs.unlink);
const existsFileAsync = util.promisify(fs.exists);

module.exports = {
  writeFile: async (path, content) => {
    await writeFileAsync(path, content);
  },

  removeFile: async (path) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      logger.error(`REMOVE_FILE_ERROR :: file ${path} doesn't exist`);
    }
  },

  exists: async (path) => {
    return await existsFileAsync(path);
  },
};
