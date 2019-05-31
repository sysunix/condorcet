import { attributes } from "structure";

export const CondorcetModel = attributes({
  ranking: {
    type: Array,
    itemType: Object,
    required: true
  },
  matrix: {
    type: Object,
    required: true
  },
  timestamp: {
    type: Object
  }
})(class Condorcet {});

export const UninominalModel = attributes({
  ranking: {
    type: Array,
    itemType: Object,
    required: true,
    default: null
  },
  timestamp: {
    type: Object
  }
})(class Uninominal {});
