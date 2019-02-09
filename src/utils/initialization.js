import { auth } from "../firebase";
import { INITIALIZE } from "../types";

/**
 * isAppInitialized: bool
 * cb(user)
 */
export default (store, cb) => {
  const isAppInitialized = store.state.app.initialized;

  if (isAppInitialized === true) {
    cb({ state: "already_initialized" });
    return;
  }

  const timeoutId = setTimeout(() => {
    store.commit(`app/${INITIALIZE}`);
    cb({ state: "no_user" });
  }, 1500);

  auth.onAuthStateChanged(user => {
    if (!user) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    store.commit(`app/${INITIALIZE}`);
    store.dispatch("user/setUser", user);

    cb({ state: "just_logged" });
  });
};
