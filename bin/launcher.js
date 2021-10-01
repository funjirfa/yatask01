const HTTPServer = require('../core/http');

const { port } = require('../config');
const routes = require('../routes');


new HTTPServer(routes).run(port);
