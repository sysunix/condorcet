import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

jest.mock("../../firebase.js", () => {
  const { when } = require("jest-when");

  const doc = jest.fn();
  when(doc)
    .calledWith("condorcet")
    .mockReturnValue({
      get: () => ({
        data: () => ({
          matrix: {
            zorro: {
              luffy: 1,
              sanji: 1
            },
            luffy: {
              zorro: 0,
              sanji: 1
            },
            sanji: {
              zorro: 0,
              luffy: 0
            }
          },
          ranking: [
            {
              rank: 1,
              value: "Zorro",
              slug: "zorro",
              wins: 1,
              equalities: 1
            },
            {
              rank: 2,
              value: "Luffy",
              slug: "luffy",
              wins: 1,
              equalities: 1
            },
            {
              rank: 3,
              value: "Sanji",
              slug: "sanji",
              wins: 0,
              equalities: 0
            }
          ]
        })
      })
    });

  when(doc)
    .calledWith("uninominal")
    .mockReturnValue({
      get: () => ({
        data: () => ({
          ranking: [{ value: "luffy", rank: 1 }]
        })
      })
    });

  return {
    db: {
      collection: () => ({
        doc: () => ({
          collection: () => ({
            doc
          })
        })
      })
    }
  };
});

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

  it("set data", () => {
    expect(wrapper.vm.uninominal).toEqual([
      {
        rank: 1,
        value: "luffy"
      }
    ]);
  });
});
