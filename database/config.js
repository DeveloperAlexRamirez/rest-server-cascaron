const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Conectado a la DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar DB');
  }
};

module.exports = {
  dbConnection,
};
