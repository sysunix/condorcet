import { shallowMount } from "@vue/test-utils";
import PollJoin from "../PollJoin.vue";

jest.mock("../../firebase", () => ({
  db: {
    collection: () => ({
      doc: () => ({
        get: () => ({
          data: () => ({
            token: "le-token"
          })
        })
      })
    })
  }
}));

const $route = {
  params: "adz93dze823j",
  query: { q: "le-token" }
};

describe("PollJoin.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollJoin, { mocks: { $route } });

    expect(wrapper).toMatchSnapshot();
  });
});
