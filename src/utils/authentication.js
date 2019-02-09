import firebase, { auth } from "../firebase";

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = cb => {
  auth.useDeviceLanguage();
  auth
    .signInWithPopup(provider)
    .then(result => {
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      cb(result.user);
    })
    .catch(function(error) {
      console.error(error);
    });
};

export const signOut = cb => {
  auth
    .signOut()
    .then(() => {
      cb(null);
    })
    .catch(error => {
      cb({ status: "error", error });
    });
};
