const { join, resolve } = require('path');
const { expect } = require('chai');
const newGrpcClient = require('../lib');
// const echo = require('./echo');

describe('newGrpcClient', () => {

  it('should run as expected with default inputs', async() => {
    let error = null;
    try {
      const echoService = newGrpcClient({
        protoFiles: [
          resolve(join(__dirname, '..', 'grpc.base.v1.proto')),
          resolve(join(__dirname, '..', 'grpc.echo.v1.proto')),
        ],
        packageName: 'grpc.echo.v1',
        serviceName: 'EchoService',
        host: 'localhost:9090',
      });
      expect(typeof echoService === 'object').to.eq(true);
    } catch (err) {
      error = err;
    }
    expect(error).to.eq(null);
  });

});
