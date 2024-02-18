const { join, resolve } = require('path');

const host = '0.0.0.0:9090';

const baseProtoFile = resolve(join(__dirname, '..', 'grpc.base.v1.proto'));
const echoProtoFile = resolve(join(__dirname, '..', 'grpc.echo.v1.proto'));

module.exports = {
  host,
  baseProtoFile,
  echoProtoFile,
};
