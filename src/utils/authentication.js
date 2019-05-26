import firebase, { auth } from "../firebase";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const signIn = (provider, cb, errorCb) => {
  auth.useDeviceLanguage();

  let authProvider;
  switch (provider) {
    case "google":
      authProvider = googleAuthProvider;

      break;
    case "github":
      authProvider = githubAuthProvider;

      break;

    case "facebook":
      authProvider = facebookAuthProvider;

      break;

    default:
      throw new Error('Provider must be "facebook", "github" or "google"');
  }

  auth
    .signInWithPopup(authProvider)
    .then(result => {
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      cb(result.user);
    })
    .catch(function(error) {
      errorCb(error);
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
