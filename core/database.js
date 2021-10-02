const { EventEmitter } = require('events');
const { existsSync, mkdirSync } = require('fs');

const { dump, images } = require('../config');
const { writeFile } = require('../helpers/file');
const Jpeg = require('./jpeg');
const logger = require('../logger');


class Database extends EventEmitter {
  constructor() {
    super();

    this.imageData = {};
  }

  async init() {
    if (!existsSync(images)) {
      mkdirSync(images, { recursive: true });
    }

    if (!existsSync(dump)) {
      return;
    }

    const imageDump = require(dump);
    for (const jpeg of imageDump) {
      this.imageData[jpeg.id] = new Jpeg(jpeg);
    }
  }

  async insert(jpeg) {
    this.imageData[jpeg.id] = jpeg;

    this.emit('changed');
  }

  async remove(jpegId) {
    if (this.imageData[jpegId]) {
      await this.imageData[jpegId].remove();

      delete this.imageData[jpegId];

      this.emit('changed');
    }
  }

  findOne(jpegId) {
    if (!this.imageData[jpegId]) {
      return null;
    }

    return this.imageData[jpegId];
  }

  find() {
    let allJpeg = Object.values(this.imageData).map((jpeg) => jpeg.export());

    allJpeg.sort((jpegA, jpegB) => (jpegA.createdAt > jpegB.createdAt) ? 1 : ((jpegA.createdAt < jpegB.createdAt) ? -1 : 0));

    return allJpeg;
  }

  toJSON() {
    return Object.values(this.imageData);
  }
}

const db = new Database();

db.init().then(() => logger.debug('Database init success'));

db.on('changed', () => {
  writeFile(dump, JSON.stringify(db.toJSON(), null, 2))
    .then(() => {
      logger.info('CHANGED :: DataBase');
    });
});

module.exports = db;