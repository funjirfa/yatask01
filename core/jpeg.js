const path = require('path');

const sizeOf = require('image-size')

const { images } = require('../config');
const { removeFile } = require('../helpers/file');


module.exports = class Jpeg {
  constructor(options) {
    this.id = options.id || options.filename;
    this.createdAt = options.createdAt || new Date();
    this.size = options.size;

    const dimensions = sizeOf(path.resolve(images, `${this.id}`));
    this.width = options.width || dimensions.width;
    this.height = options.height || dimensions.height;
  }

  async remove() {
    await removeFile(path.resolve(images, `${this.id}`));
  }

  export() {
    return {
      id: this.id,
      size: this.size,
      createdAt: this.createdAt,
    };
  }

  import() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      size: this.size,
      width: this.width,
      height: this.height,
    };
  }
};