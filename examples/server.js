const { loadPackageDefinition, Server, ServerCredentials } = require('@grpc/grpc-js');
const { loadSync } = require('@grpc/proto-loader');
const { host, echoProtoFile, baseProtoFile } = require('./_shared');

const options = {
  defaults: true,
  enums   : String,
  keepCase: true,
  longs   : String,
  oneofs  : true,
};

const echoProto = loadSync([baseProtoFile, echoProtoFile], options);
const echoProtocol = loadPackageDefinition(echoProto);
const echoServiceInterface = echoProtocol.grpc.echo.v1.EchoService.service;

main();

function Echo(call, callback) {
  console.log('new request to Echo()...', call.request);
  return callback(null, { data: call.request.data });
}

function EchoWithMeta(call, callback) {
  console.log('new request to EchoWithMeta()...', call.request);
  return callback(null, { ...call.request });
}

function EchoWithNil(call, callback) {
  console.log('new request to EchoWithNil()...', call.request);
  return callback(null, {});
}

function main() {
  const server = new Server();

  server.addService(echoServiceInterface, { Echo, EchoWithMeta, EchoWithNil });

  console.log('bindAsync...');
  server.bindAsync(host, ServerCredentials.createInsecure(), (err, port) => {
    console.log('bindAsync...done', { err, port });
    if (err) return;
    console.log('starting...');
    server.start();
    console.log('starting...done');
  });
}
