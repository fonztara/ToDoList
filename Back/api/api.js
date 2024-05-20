const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const DB_NAME = "ToDo";

const USER_COLLECTION = "users";
const TASK_COLLECTION = "tasks";


async function getAllUsers() {
    try {
      /* Connessione al db */
      await client.connect();
      /* Fine */
  
      /* Selezione del db tomatime */
      const database = client.db(DB_NAME);
      /* Fine */
  
      /* Seleziono la collection users */
      const collection = database.collection(USER_COLLECTION);
      /* Fine */
  
      /* Ritorno la lista di utenti al metodo */
      return await collection.find().toArray();
      /* Fine */
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      await client.close();
    }
  }
  
  async function getUser(userEmail) {
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const userCollection = database.collection(USER_COLLECTION);
  
      const query = { email: userEmail };
      const options = { projection: { _id: 1, email: 1, password: 1 } };
  
      /* Ritorno la lista di utenti al metodo */
      return await userCollection.findOne(query, options);
      /* Fine */
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      await client.close();
    }
  }
  
  async function addUser(name, email, password) {
    try {
      /* Connessione al db */
      await client.connect();
      /* Fine */
  
      /* Selezione del db tomatime */
      const database = client.db(DB_NAME);
      /* Fine */
  
      /* Seleziono la collection users */
      const userCollection = database.collection(USER_COLLECTION);
      /* Fine */
  
      /* Uso il comando insertOne per inserire il singolo user */
      const user = await userCollection.insertOne({
        name,
        email,
        password,
      });
      /* Fine */
  
      /* Recupero l'id dell'utente appena inserito */
      return user.insertedId;
      // const newUserId = user.insertedId;
      /* Fine */
  
      /* Uso l'id del nuovo utente per recuperarlo e tornarlo alla chiamata */
      // return await userCollection.findOne({ _id: new ObjectId(newUserId) });
      /* Fine */
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      await client.close();
    }
  }

  module.exports = {
    getAllUsers,
    getUser,
    addUser,
  }