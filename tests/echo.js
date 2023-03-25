const { loadPackageDefinition, Server } = require('@grpc/grpc-js');
const { loadSync } = require('@grpc/proto-loader');
const { join } = require('path');

const options = {
  defaults: true,
  enums   : String,
  keepCase: true,
  longs   : String,
  oneofs  : true,
};

const file1 = join(__dirname, '..', 'base.proto');
const file2 = join(__dirname, '..', 'echo.proto');
const protoLoaded = loadSync([file1, file2], options);
const protocol = loadPackageDefinition(protoLoaded);
const { EchoService } = protocol.grpc.echo.v1;

function Echo(call, callback) {
  return callback(null, { data: call.request.data });
}

function EchoWithMeta(call, callback) {
  return callback(null, { ...call.request });
}

function EchoWithNil(call, callback) {
  return callback(null, {});
}

function newEchoServer() {
  const server = new Server();
  server.addService(EchoService.service, { Echo, EchoWithMeta, EchoWithNil });
  return server;
}

module.exports = {
  newEchoServer,
  protocol,
};
