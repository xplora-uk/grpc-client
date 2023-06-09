# grpc-client

gRPC client based on @grpc/grpc-js and @grpc/proto-loader

It does not support streams.

## requirements for dev

* Node v14.x

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

* Node v14.x

### install library

```sh
npm i @xplora-uk/grpc-client
```

### usage

You can check `tests` and `examples`.

```javascript

const newGrpcClient = require('@xplora-uk/grpc-client');
// simplest example
  const echoService = newGrpcClient({
    protoFiles: ['../base.proto', '../echo.proto'],
    packageName: 'grpc.echo.v1',
    serviceName: 'EchoService',
    host,
  });

const echoReply = await echoService.Echo({ data: 'hello ' });
```
