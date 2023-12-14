// db.js
let data = [
   
   
    // Add more data as needed
  ];
  
  const getAllData = () => {
    return data;
  };
  
  const addData = (newData) => {
    const newDataWithId = { id: data.length + 1, ...newData };
    data.push(newDataWithId);
    return newDataWithId;
  };
  
  module.exports = { getAllData, addData };
  