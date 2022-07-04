import app from './index';
import server from './grpc/notifications/server';
import * as grpc from 'grpc';

const PORT = process.env.PORT || 4000;

app.listen({port: PORT}, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  server.bindAsync(
      '127.0.0.1:5000',
      grpc.ServerCredentials.createInsecure(),
      (e) => {
        console.log('error in gRPC server: ' + e);
      },
  );
  server.start();
});
