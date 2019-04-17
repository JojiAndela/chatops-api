
const database = {};

// method to filter object
Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

module.exports = {
  addData: (model, data) => {
    if(!database[model]){
      database[model] = {};
    }
    const id = Object.keys(database[model]).length + 1;
    data.id = id;
    database[model][id] = data;
    return data;
  },

  getAll: (model) => {
    const dataModel = database[model];
    if(!dataModel){
      return `no data in ${model}`;
    }

    return {[model]: dataModel};
  },

  getOne: (model, id) => {
    const dataModel = database[model];
    if(!dataModel){
      return `no data in ${model}`;
    }

    const data = dataModel[id];

    if(!data){
      return `no such data in ${model}`;
    }

    return {[model]: data};
  },

  updateData: (model,id, data) => {
    const dataModel = database[model];
    if(!dataModel){
      return `no data in ${model}`;
    }

    const dataToUpdate = dataModel[id];

    if(!dataToUpdate){
      return `no such data in ${model}`;
    }

    data.id = id;
    database[model][id] = data;
    return `data updated in ${model}: ${data}`;
  },

  deleteData: (model, id) => {
    const dataModel = database[model];
      if(!dataModel){
        return `no data in ${model}`;
      }
      const dataToDelete = dataModel[id];

      if(!dataToDelete){
        return `no such data in ${model}`;
      }


      delete database[model][id];
      return `data deleted from ${model}: ${dataToDelete}`;
  },

  find: (model, item, value) => {
    const dataModel = database[model];
    if(!dataModel){
      return `no data in ${model}`;
    }

    const filtered = Object.filter(dataModel, post => post[item] === value);

    if(!Object.keys(filtered).length){
      return `no such data in ${model}`;
    }

    return {[model]: filtered};
  }

}