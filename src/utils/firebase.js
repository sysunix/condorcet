export const getDataFromQuerySnapshot = querySnapshot => {
  let docs = [];

  querySnapshot.forEach(doc => {
    docs.push({ id: doc.id, ...doc.data() });
  });

  return docs;
};

export const convertDocumentSnapshotToJson = doc => {
  return { id: doc.id, ...doc.data() };
};

export const convertDocumentsSnapshotToJson = docs => {
  return docs.map(convertDocumentSnapshotToJson);
};

class Firebase {
  constructor() {
    this.collection = "";
  }

  /**
   * Prend une list snapshot de document et retourne les données au format JSON
   * @param {*} doc
   */

  /**
   * Retourne l'instance
   */
  getInstance() {
    return this.collection;
  }

  /**
   * Ajout un document a la collection
   * @param {*} data
   */
  async create(data) {
    const newDocument = await this.collection.add(data);
    const newDocumentSnapshot = await newDocument.get();

    return Firebase.convertDocumentSnapshotToJson(newDocumentSnapshot);
  }

  /**
   * Liste les documents d'une collection
   * @param {*} whereClause Paramètre optionnel ajoutant une clause where sur la requête
   */
  async list(whereClause = { field: null, operator: null, value: null }) {
    const { field, operator, value } = whereClause;

    if (field && operator && value) {
      return Firebase.convertDocumentsSnapshotToJson(
        (await this.collection.where(field, operator, value).get()).docs
      );
    }

    return Firebase.convertDocumentsSnapshotToJson(
      (await this.collection.get()).docs
    );
  }

  /**
   * Retourne un document basé sur son identifiant
   * @param {*} id
   */
  async get(id) {
    const document = await this.collection.doc(id).get();

    return Firebase.convertDocumentSnapshotToJson(document);
  }
}

export default Firebase;
