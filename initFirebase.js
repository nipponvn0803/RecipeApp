import * as firebase from 'firebase';
import {config} from './key.js';
firebase.initializeApp(config);

export default firebase;