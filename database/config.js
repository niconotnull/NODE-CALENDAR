const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('BASE de datos en linea');
  } catch (error) {
    console.log(error);
    throw new Error('Error en la conexión de la bd');
  }
};
module.exports = { dbConection };
