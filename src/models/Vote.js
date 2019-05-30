import { attributes } from "structure";
import firebase from "../firebase";

const Vote = attributes({
  vote: { type: Array, required: true, itemType: Object, minLength: 2 },
  timestamp: {
    type: Object,
    required: true,
    default: firebase.firestore.FieldValue.serverTimestamp()
  }
})(class Vote {});

export default Vote;
