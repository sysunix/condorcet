import initialization from "../initialization";

const store = {
  state: {
    app: {
      initialized: false
    }
  },
  commit: jest.fn(),
  dispatch: jest.fn()
};

describe("utils/initialization", () => {
  it("should return that the app is already_initialized", done => {
    const newStore = {
      ...store,
      state: {
        app: {
          initialized: true
        }
      }
    };

    initialization(newStore, result => {
      expect(result).toEqual({ state: "already_initialized" });
      done();
    });
  });

  it("should return that there is no_user", done => {
    initialization(store, status => {
      expect(status).toEqual({ state: "no_user" });
      done();
    });
  });
});
