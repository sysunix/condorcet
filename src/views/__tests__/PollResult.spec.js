import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

jest.mock("../../firebase.js", () => ({
  db: {
    collection: () => ({
      doc: () => ({
        get: () => ({
          data: () => ({
            answers: [
              { slug: "luffy", value: "Luffy" },
              { value: "Zorro", slug: "zorro" },
              { value: "Sanji", slug: "sanji" }
            ],
            condorcet: {
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

  it("set data", () => {
    expect(wrapper.vm.uninominal).toEqual([
      {
        rank: 1,
        value: "luffy"
      }
    ]);
  });
});
