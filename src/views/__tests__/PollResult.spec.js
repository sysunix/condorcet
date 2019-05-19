import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

jest.mock("../../firebase.js", () => ({
  db: {
    collection: () => ({
      doc: () => ({
        get: () => ({
          data: () => ({
            condorcet: {
              luffy: {
                zorro: 0,
                sanji: 1
              },
              zorro: {
                luffy: 1,
                sanji: 1
              },
              sanji: {
                luffy: 0,
                zorro: 0
              }
            },
            uninominal: [{ value: "luffy", rank: 1 }]
          })
        })
      })
    })
  }
}));

const $route = {
  params: "adz93dze823j"
};

describe("PollResult.vue", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PollResult, {
      store,
      mocks: {
        $route
      }
    });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should set computed props", () => {
    expect(wrapper.vm.answers).toEqual(["luffy", "zorro", "sanji"]);
  });

  it("set data", () => {
    expect(wrapper.vm.uninominal).toEqual([
      {
        rank: 1,
        value: "luffy"
      }
    ]);
  });
});
