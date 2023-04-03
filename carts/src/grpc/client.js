const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const grpc = require("@grpc/grpc-js");


const productsProto = grpc.loadPackageDefinition(protoLoader.loadSync(path.join(__dirname, '../../../products.proto')));


const productsService = new productsProto.Products('0.0.0.0:50051', grpc.credentials.createInsecure());

module.exports = productsService