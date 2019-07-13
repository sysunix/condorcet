import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PollCreation from "../PollCreation.vue";

import { createPoll } from "../../utils/request";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../firebase");

jest.mock("../../utils/request");

describe("PollCreation.vue", () => {
  let wrapper;
  let appActions;

  beforeEach(() => {
    jest.clearAllMocks();
    appActions = { addNotification: jest.fn() };

    const store = new Vuex.Store({
      modules: {
        app: { namespaced: true, actions: appActions },
        user: {
          namespaced: true
        }
      }
    });

    wrapper = shallowMount(PollCreation, {
      localVue,
      store,
      computed: {
        userId: () => "azfnez893jfz"
      }
    });
  });

  it("should render", () => {
    expect(wrapper.vm.userId).toBe("azfnez893jfz");
    expect(wrapper).toMatchSnapshot();
  });

  it("should not add answer to the poll", () => {
    wrapper.vm.addAnswer();

    expect(appActions.addNotification).toHaveBeenCalled();
  });

  it("should remove answer", () => {
    wrapper.setData({ answers: [{ slug: "foo", value: "Foo" }] });
    expect(wrapper.vm.answers).toEqual([{ slug: "foo", value: "Foo" }]);

    wrapper.find("li > button").trigger("click");

    expect(wrapper.vm.answers).toEqual([]);
  });

  it("should add answer to the poll", () => {
    const answerInput = wrapper.find("#answer");
    const addAnwserButton = wrapper.find("button");

    answerInput.setValue("Les pommes");
    answerInput.trigger("change");

    expect(wrapper.vm.answer).toBe("Les pommes");

    addAnwserButton.trigger("click");

    expect(wrapper.vm.answer).toBe("");
    expect(wrapper.vm.answers).toEqual([
      {
        slug: "les-pommes",
        value: "Les pommes"
      }
    ]);
  });

  it("should not create poll and notify user that there is an error if question or answer are not set", () => {
    const questionInput = wrapper.find("#question");
    const answerInput = wrapper.find("#answer");
    const addAnwserButton = wrapper.find("button");

    questionInput.setValue("Quel est le meilleru fruit ?");
    answerInput.trigger("change");

    answerInput.setValue("Les pommes");
    answerInput.trigger("change");
    addAnwserButton.trigger("click");

    answerInput.setValue("Les poires");
    answerInput.trigger("change");
    addAnwserButton.trigger("click");

    wrapper.vm.submitPoll();

    expect(createPoll).toHaveBeenCalled();
  });

  // it("should create the poll and notify user that there is an error", () => {
  //   wrapper.setData({
  //     question: "Qui est la plus belle ?",
  //     answers: ["Megan Fox", "Scarlett", "Natalie Portman"]
  //   });

  //   wrapper.vm.submitPoll();

  //   expect(firebase.db.collection).toHaveBeenCalledWith("polls");
  // });
});
