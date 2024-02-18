# grpc-client

gRPC client based on @grpc/grpc-js and @grpc/proto-loader

It does not support streams.

## requirements for dev

* Node v18.x

### install

```sh
npm i
```

Source code is inside `lib`

### test

```sh
npm run test
```

## requirements to use

* Node v18.x

### install library

```sh
npm i @xplora-uk/grpc-client
```

### usage

You can check `tests` and `examples`.

```javascript
const { join, resolve } = require('path');
const newGrpcClient = require('@xplora-uk/grpc-client');

// simplest example
const baseProtoFile = resolve(join(__dirname, '..', 'grpc.base.v1.proto'));
const echoProtoFile = resolve(join(__dirname, '..', 'grpc.echo.v1.proto'));
const echoService = newGrpcClient({
  protoFiles: [
    baseProtoFile,
    echoProtoFile,
  ],
  packageName: 'grpc.echo.v1',
  serviceName: 'EchoService',
  host,
});

const echoReply = await echoService.Echo({ data: 'hello ' });
```
