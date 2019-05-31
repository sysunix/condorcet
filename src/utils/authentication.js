import firebase, { auth } from "../firebase";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const signIn = async provider => {
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

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await auth.signInWithPopup(authProvider);
};

export const signOut = () => auth.signOut();
