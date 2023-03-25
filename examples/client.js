const { host } = require('./_shared');
const newGrpcClient = require('../lib');

main();

async function main() {

  const echoService = newGrpcClient({
    protoFiles: ['../base.proto', '../echo.proto'],
    packageName: 'grpc.echo.v1',
    serviceName: 'EchoService',
    host,
  });

  console.log('calling EchoService.Echo()...');
  const dt = new Date();
  const echoReply = await echoService.Echo({ data: 'hello ' + dt.toISOString() });
  console.log('calling EchoService.Echo... done!', echoReply);

  console.log('calling EchoService.EchoWithMeta()...');
  const dt2 = new Date();
  const echoReply2 = await echoService.EchoWithMeta({ data: 'hello ' + dt2.toISOString(), meta: { id: '123' }});
  console.log('calling EchoService.EchoWithMeta()... done!', echoReply2);

  console.log('calling EchoService.EchoWithNil()...');
  const echoReply3 = await echoService.EchoWithNil({});
  console.log('calling EchoService.EchoWithNil()... done!', echoReply3);

}
