import {connect} from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/';

const connectToDatabase = (
	mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL
) => connect(mongoDatabaseURI);

export default connectToDatabase;
