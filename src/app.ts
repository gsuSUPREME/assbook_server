import app from './index';

const PORT = process.env.PORT || 4000;

app.listen({port: PORT}, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
