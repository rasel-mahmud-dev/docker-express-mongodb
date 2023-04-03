const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


//create GRPC server....

const productsProto = grpc.loadPackageDefinition(protoLoader.loadSync(path.join(__dirname, './protos/products.proto')));


function findProduct(call, callback) {

}

const server = new grpc.Server();
server.addService(productsProto.Products.service, { find: findProduct });

const PORT = "0.0.0.0:50051"

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("gRPC server start on " + PORT)
});

