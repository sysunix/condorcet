import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PollCreation from "../PollCreation.vue";
import firebase from "../../firebase";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../firebase.js", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve())
    }))
  }
}));

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
    wrapper.vm.createPoll();

    expect(appActions.addNotification).toHaveBeenCalled();
  });

  it("should create the poll and notify user that there is an error", () => {
    wrapper.setData({
      question: "Qui est la plus belle ?",
      answers: ["Megan Fox", "Scarlett", "Natalie Portman"]
    });

    wrapper.vm.createPoll();

    expect(firebase.db.collection).toHaveBeenCalledWith("polls");
  });
});
