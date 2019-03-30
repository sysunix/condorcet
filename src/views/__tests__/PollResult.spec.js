import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

jest.mock("../../firebase", () => {
  const firebasemock = require("firebase-mock");
  const mockauth = new firebasemock.MockAuthentication();
  const mockfirestore = new firebasemock.MockFirestore();
  const mocksdk = new firebasemock.MockFirebaseSdk(
    null,
    () => mockauth,
    () => mockfirestore
  );
  const firebase = mocksdk.initializeApp();
  const db = firebase.firestore();
  const auth = firebase.auth();
  return firebase, { db, auth };
});

const $route = {
  params: "adz93dze823j"
};

describe("PollResult.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollResult, {
      store,
      mocks: {
        $route
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
