import { beforeEach } from "../router";
import initializationMiddleware from "../utils/initialization";

jest.mock("../utils/initialization");

describe("router", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should do nothing", () => {
    const next = jest.fn();

    initializationMiddleware.mockImplementation((store, cb) =>
      cb({ state: "" })
    );

    beforeEach({ meta: { auth: "" } }, {}, next);
    expect(next).toBeCalled();
  });

  it("should redirect to authentication", () => {
    const next = jest.fn();

    initializationMiddleware.mockImplementation((store, cb) =>
      cb({ state: "no_user" })
    );

    beforeEach({ meta: { auth: "" } }, {}, next);
    expect(next).toBeCalledWith({ name: "authentication" });
  });

  it("should redirect to poll list", () => {
    const next = jest.fn();

    initializationMiddleware.mockImplementation((store, cb) =>
      cb({ state: "just_logged" })
    );

    beforeEach({ meta: { auth: "" }, name: "authentication" }, {}, next);
    expect(next).toBeCalledWith({ name: "polls_list" });
  });
});
