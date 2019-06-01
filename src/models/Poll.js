import { attributes } from "structure";
import randomString from "random-string";
import firebase from "../firebase";

const Poll = attributes({
  answers: { type: Array, required: true, itemType: Object, minLength: 2 },
  description: { type: String, empty: true },
  isActive: { type: Boolean, required: true, default: true },
  isPublic: { type: Boolean, required: true, default: false },
  owner: { type: String, required: true },
  question: { type: String, required: true },
  token: {
    type: String,
    default: randomString({ length: 20 })
  },
  users: { type: Array, itemType: String, required: true },
  timestamp: {
    type: Object,
    required: true,
    default: firebase.firestore.FieldValue.serverTimestamp()
  }
})(class Poll {});

export default Poll;
