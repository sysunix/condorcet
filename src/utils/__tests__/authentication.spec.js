import { auth } from "../../firebase";
import { signIn, signOut } from "../authentication";

jest.mock("../../firebase");

describe("utils/authentication", () => {
  it("should not signIn if provider is not correct", () => {
    function error() {
      signIn("twitter");
    }
    expect(error).toThrow('Provider must be "github" or "google"');
  });

  it("should signIn and return ", done => {
    auth.signInWithPopup.mockImplementation(() =>
      Promise.resolve({ user: "Smaug" })
    );

    signIn(
      "google",
      user => {
        expect(auth.signInWithPopup).toBeCalled();
        expect(user).toBe("Smaug");
        done();
      },
      () => {}
    );
  });

  it("should signOut and return null ", done => {
    auth.signOut.mockImplementation(() => Promise.resolve());

    signOut(result => {
      expect(auth.signOut).toBeCalled();
      expect(result).toBe(null);
      done();
    });
  });
});
