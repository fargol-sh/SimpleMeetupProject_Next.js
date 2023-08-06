// the url of this file: /api/new-meetup
import { MongoClient } from 'mongodb'


async function handler(req, res) {
   if (req.method === 'POST') {
      const data = req.body;

      console.log(data);
      const client = await MongoClient.connect('mongodb+srv://fargol_sh:13799731_Fargol_Sh_Sec_.@cluster0.1xokuey.mongodb.net/?retryWrites=true&w=majority');
      const db = client.db();

      console.log('hello!');
      // collection in MongoDB is a set of documents
      // so here, every meetup is a document and meetupCollections
      // is a set of meetup documents.
      const meetupsCollections = db.collection('meetups');

      const result = await meetupsCollections.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({
         message: 'Meetup inserted!'
      });
   }
}

export default handler;