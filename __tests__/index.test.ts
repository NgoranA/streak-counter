import { JSDOM } from "jsdom";

import { streakCounter } from "../src/index";
import { formatedDate } from "../src/utils";

describe("streak Counter", () => {
  let mockLocalStorge: Storage;
  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });

    mockLocalStorge = mockJSDom.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorge.clear();
  });

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    // const mockLocalStorge = "";
    const date = new Date();
    const streak = streakCounter(mockLocalStorge, date);

    expect(streak.hasOwnProperty("currentCount")).toBe(true);
    expect(streak.hasOwnProperty("startDate")).toBe(true);
    expect(streak.hasOwnProperty("lastLoginDate")).toBe(true);
  });

  it("should return a streak starting at 1 and keep track of of the lastLogin", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorge, date);

    const dateFormatted = formatedDate(date);
    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });

  //   store streak to local storage
  it("should store the streak in localstorage", () => {
    const date = new Date();
    const key = "streak";
    streakCounter(mockLocalStorge, date);

    const streakAsString = mockLocalStorge.getItem(key);
    expect(streakAsString).not.toBeNull();
  });
  describe("with a pre-populated streak", () => {
    let mockLocalStorage: Storage;
    beforeEach(() => {
      const mockJSDom = new JSDOM("", { url: "https://localhost" });

      mockLocalStorage = mockJSDom.window.localStorage;

      // Use date in past so it’s always the same
      const date = new Date("12/12/2021");

      const streak = {
        currentCount: 1,
        startDate: formatedDate(date),
        lastLoginDate: formatedDate(date),
      };

      mockLocalStorage.setItem("streak", JSON.stringify(streak));
    });
    afterEach(() => {
      mockLocalStorage.clear();
    });
    it("should return the streak from localStorage", () => {
      const date = new Date("12/12/2021");
      const streak = streakCounter(mockLocalStorage, date);

      // Should match the dates used to set up the tests
      expect(streak.startDate).toBe("12/12/2021");
    });
    it("should increment the streak", () => {
      const date = new Date("12/13/2021");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);
    });
    it("should not increment the streak when login days not consecutive", () => {
      // It should not increment because this is two days after
      // the streak started and the days aren't consecutive.
      const date = new Date("12/14/2021");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(1);
    });
    it("should save the incremented streak to local storage", () => {
      const key = "streak";
      const date = new Date("12/13/2021");

      streakCounter(mockLocalStorage, date);

      const streakAsString = mockLocalStorage.getItem(key);
      //   try {
      const streak = JSON.parse(streakAsString || "");
      expect(streak.currentCount).toBe(2);
      //   } catch (error) {
      //     console.log(error);
      //   }
    });
    it("should reset if not consecutive", () => {
      const date = new Date("12/13/2021");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);

      // Skip a day and break the streak
      const dateUpdated = new Date("12/15/2021");
      const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);

      expect(streakUpdated.currentCount).toBe(1);
    });

    it("should save the reset streak to the local storage", () => {
      const key = "streak";
      const date = new Date("12/13/2021");

      // call it once so that the streak is updated
      streakCounter(mockLocalStorage, date);

      // skip a day and break the streak

      const dateUpdated = new Date("12/15/2021");
      const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);

      const streakAsString = mockLocalStorage.getItem(key);
      const streak = JSON.parse(streakAsString || "");

      expect(streak.currentCount).toBe(1);
    });

    it("should not reset the streak for same-day login", () => {
      const date = new Date("12/13/2021");
      // Call it once so it updates the streak
      streakCounter(mockLocalStorage, date);

      // Simulate same-day login
      const dateUpdated = new Date("12/13/2021");
      const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);

      expect(streakUpdated.currentCount).toBe(2);
    });
  });
});
