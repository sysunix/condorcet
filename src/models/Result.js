import { attributes } from "structure";
import firebase from "../firebase";

const Result = attributes({
  condorcet: { type: Object, required: true, default: null },
  uninominal: { type: Object, required: true, default: null },
  timestamp: {
    type: Object,
    required: true,
    default: firebase.firestore.FieldValue.serverTimestamp()
  }
})(class Result {});

export default Result;
