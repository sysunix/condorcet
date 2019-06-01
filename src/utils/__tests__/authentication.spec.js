import { auth } from "../../firebase";
import { signIn, signOut } from "../authentication";

jest.mock("../../firebase");

describe("utils/authentication", () => {
  it("should not signIn if provider is not correct", async () => {
    expect.assertions(1);
    try {
      await signIn("twitter");
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: Provider must be "facebook", "github" or "google"]`
      );
    }
  });

  ["google", "github", "facebook"].forEach(provider => {
    it(`should signIn with ${provider} `, async done => {
      expect.assertions(2);

      const { user } = await signIn(provider);

      expect(auth.signInWithPopup).toBeCalled();
      expect(user).toBe("Smaug");
      done();
    });
  });

  it("should signOut", async () => {
    expect.assertions(1);
    await signOut();
    expect(auth.signOut).toBeCalled();
  });
});
