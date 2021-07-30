const moment = require('moment');
moment.suppressDeprecationWarnings = true;

const isDate = (value) => {
  console.log('value ', value);
  if (!value) {
    return false;
  }
  const fecha = moment(new Date());
  console.log('value ', fecha);

  if (fecha.isValid()) {
    console.log('Es cococ');
    return true;
  }

  return false;
};

module.exports = { isDate };
