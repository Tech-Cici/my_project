const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://your_username:your_password@your_host:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('your_database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  getDb: connectToDatabase,
};
