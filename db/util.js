const fs = require('fs');

module.exports.createEnvelop = (title, budget) => {
  const envelopes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  if (title.length > 0 && parseInt(budget) >= 0){
    const envelope = {
      id: envelopes.data.length + 1, 
      title: title, 
      budget: parseInt(budget)
    };
    envelopes.data.push(envelope);
    fs.writeFileSync('./db/db.json', JSON.stringify(envelopes), {flag: 'w'});
    return envelope;
  }
  return null;
}
// module.exports.getNewId = () => {
//   const {data} = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
//   return data.length + 1;
// }

module.exports.getEnvelope = () => {
  return JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
}

module.exports.getEnvelopeById = (id) => {
  const {data} = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

  const index = data.findIndex((item) => item.id === parseInt(id));
  if (index >= 0) 
    return data[index];
  else
    return null;
}

module.exports.updateEnvelopeById = (id, title, budget) => {
  const envelopes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const index = envelopes.data.findIndex((item) => item.id === parseInt(id));
  if (index >= 0){
    if (title.length > 0)
      envelopes.data[index].title = title;
    if (parseInt(budget) >= 0)
      envelopes.data[index].budget = parseInt(budget);
    fs.writeFileSync('./db/db.json', JSON.stringify(envelopes), {flag: 'w'});
    return envelopes.data[index];
  }
  return null;
}

module.exports.deleteEnvelopeById = (id) => {
  const envelopes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const index = envelopes.data.findIndex((item) => item.id === parseInt(id));
  if (index >= 0){
    const envelop = envelopes.data[index];
    envelopes.data.splice(index, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(envelopes), {flag: 'w'});
    return envelop;
  }
  return null;
}

module.exports.transfer = (from, to, budget) => {
  const envelopes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  from = parseInt(from);
  to = parseInt(to);
  budget = parseInt(budget);
  const fromIndex = envelopes.data.findIndex((item) => item.id === from); 
  const toIndex = envelopes.data.findIndex((item) => item.id === to); 
  if (fromIndex < 0){
    return -1;
  }
  else if (toIndex < 0){
    return -2;
  }
  else if (envelopes.data[fromIndex].budget < budget){
    return 1;
  }
  else{
    envelopes.data[fromIndex].budget -= budget;
    envelopes.data[toIndex].budget += budget;
    fs.writeFileSync('./db/db.json', JSON.stringify(envelopes), {flag: 'w'});
    return 0;
  }
}



 
