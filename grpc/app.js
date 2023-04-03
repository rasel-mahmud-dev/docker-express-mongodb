const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


//create GRPC server....

const productsProto = grpc.loadPackageDefinition(protoLoader.loadSync(path.join(__dirname, './protos/products.proto')));

function findProduct(call, callback) {

    (async function(){

        try{
            let recipe = await Recipe.findOne({_id: call.request._id})
            callback(null, recipe);

        } catch(ex){

            callback({
                message: 'Recipe not found',
                code: grpc.status.INVALID_ARGUMENT
            });
        }

    }())

}

const server = new grpc.Server();
server.addService(productsProto.Products.service, { find: findProduct });

const PORT = "0.0.0.0:50051"

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("gRPC server start on " + PORT)
});


// create grpc client
const packageDefinitionReci = protoLoader.loadSync(path.join(__dirname, '../protos/recipes.proto'));
const packageDefinitionProc = protoLoader.loadSync(path.join(__dirname, '../protos/processing.proto'));

const recipesProto = grpc.loadPackageDefinition(packageDefinitionReci);
const processingProto = grpc.loadPackageDefinition(packageDefinitionProc);

const recipesStub = new recipesProto.Recipes('0.0.0.0:50051', grpc.credentials.createInsecure());