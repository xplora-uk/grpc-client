const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const objGet = require('lodash.get');

const defaultLoaderOptions = {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
}

function newGrpcClient({
  protoFiles,
  loaderOptions = {},
  packageName,
  serviceName,
  host, // = 'localhost:50051',
  credentials = grpc.credentials.createInsecure(),
}) {
  const _options = { ...defaultLoaderOptions, ...(loaderOptions || {}) };

  const _packageDefinition = protoLoader.loadSync(protoFiles, _options);

  const _package = grpc.loadPackageDefinition(_packageDefinition);

  const ServiceClass = objGet(_package, `${packageName}.${serviceName}`);

  const _service = new ServiceClass(host, credentials);

  class GrpcClientWrapper {
    constructor(service) {
      this.__service = service;

      // inject new methods to the wrapper object
      const methodNames = Object.getOwnPropertyNames(ServiceClass.service);

      for (const methodName of methodNames) {
        
        this[methodName] = async function caller(...args) {
          return this.__call(methodName, args);
        }

      }
    }
  
    async __call(methodName, args = []) {
      // TODO: we need to handle streams in future !!!

      const service = this.__service;

      // turn callback mechanism into a promise
      return new Promise((resolve, reject) => {
        function callback(err, msg) {
          if (err) { reject(err); return; }
          resolve(msg);
        }
        const method = service[methodName];
        method.apply(service, [...args, callback]);
      });
    }
  }

  const wrapper = new GrpcClientWrapper(_service);

  return wrapper;
}

module.exports = newGrpcClient;
