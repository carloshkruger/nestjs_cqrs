import { MongoClient } from 'mongodb';

export default {
  async connect(uri: string) {
    this.uri = uri;

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = this.client.db();
  },

  async disconnect() {
    if (this.client) {
      await this.client.close();
    }

    this.client = null;
    this.db = null;
  },

  async getCollection(name: string) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri, this.dbName);
    }

    return this.db.collection(name);
  },
};
