const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const grpc = require("@grpc/grpc-js");


const packageDefinitionReci = protoLoader.loadSync(path.join(__dirname, '../../protos/carts.proto'));
const recipesProto = grpc.loadPackageDefinition(packageDefinitionReci);

const client = new recipesProto.Carts('0.0.0.0:50051', grpc.credentials.createInsecure());


module.exports = client