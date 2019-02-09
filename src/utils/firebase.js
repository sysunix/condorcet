import { db } from "../firebase";

class Firebase {
  constructor(collection, doc = null, subcollection = null) {
    this.collection =
      doc && subcollection
        ? db
            .collection(collection)
            .doc(doc)
            .collection(subcollection)
        : db.collection(collection);
  }

  /**
   * Prend une list snapshot de document et retourne les données au format JSON
   * @param {*} docs
   */
  static convertDocumentsSnapshotToJson(docs) {
    return docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
  }

  /**
   * Prend une list snapshot de document et retourne les données au format JSON
   * @param {*} doc
   */
  static convertDocumentSnapshotToJson(doc) {
    return { id: doc.id, ...doc.data() };
  }

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

  // TODO: return OK response
  update(id, data) {
    this.collection.doc(id).update(data);
  }

  /**
   * Supprime un document
   * @param {*} id
   */
  async delete(id) {
    try {
      await this.collection.doc(id).delete();

      return id;
    } catch (error) {
      return { error: true, detail: error };
    }
  }
}

export default Firebase;
