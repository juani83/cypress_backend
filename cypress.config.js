const { defineConfig } = require("cypress");
const mysql = require("mysql");
const { MongoClient } = require("mongodb");

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if(error) reject(error)
      else {
        connection.end();
        return resolve(results);
      }
    })
  });
}

async function connect(client){
  await client.connect();
  return client.db("sample_guides");
}

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const client = new MongoClient(config.env.mongo);
      on("task",{
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
        async getListing() {
          try{
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.find({}).limit(10).toArray();
          }catch(e){
            console.error(e);
          }finally{
            await client.close();
          }
        },
        async createPlanet(planet) {
          try{
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.insertOne(planet);
          }catch(e){
            console.error(e);
          }finally{
            await client.close();
          }
        },
        async clearPlanets() {
          try{
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.deleteMany({});
          }catch(e){
            console.error(e);
          }finally{
            await client.close();
          }
        }
      });
    },
    baseUrl: "http://localhost:3000",
  },
});