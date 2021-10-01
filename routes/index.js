const Router = require('express');
const multer  = require('multer');

const upload = require('./upload');
const list = require('./list');
const download = require('./download');
const remove = require('./delete');

const router = Router();

router
  .route('/upload')
  .post(multer({ dest: './store/images/' }).single('image'), upload);

router
  .route('/list')
  .get(list);

router
  .route('/image/:id')
  .get(download)
  .delete(remove);

router
  .route('/merge')
  .get();

module.exports = router;
