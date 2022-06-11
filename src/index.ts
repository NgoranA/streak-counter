import { formatedDate, Streak, KEY, buildStreak, updateStreak } from "./utils";

function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | "reset" | "none" {
  const difference =
    currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);

  // this is to check same day login

  if (difference === 0) {
    return "none";
  }
  if (difference === 1) {
    return "increment";
  }

  return "reset";
}

export function streakCounter(storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY);
  if (streakInLocalStorage) {
    try {
      // casting the parsed value to be excatly as the streak.
      // the as should be avoided most often however excep in cases like our case.
      const streak = JSON.parse(streakInLocalStorage) as Streak;
      const state = shouldIncrementOrResetStreakCount(
        date,
        streak.lastLoginDate
      );
      const SHOULD_INCREMENT = state === "increment";
      const SHOULD_RESET = state === "reset";

      if (SHOULD_INCREMENT) {
        // const updatedStreak: Streak = {
        //   ...streak,
        //   currentCount: streak.currentCount + 1,
        //   lastLoginDate: formatedDate(date),
        // };

        const updatedStreak = buildStreak(date, {
          startDate: streak.startDate,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formatedDate(date),
        });

        // storage.setItem(KEY, JSON.stringify(updatedStreak));
        updateStreak(storage, updatedStreak);
        return updatedStreak;
      }

      if (SHOULD_RESET) {
        // const updatedStreak: Streak = {
        //   currentCount: 1,
        //   startDate: formatedDate(date),
        //   lastLoginDate: formatedDate(date),
        // };

        // let us make use of the buildstreak function

        const updatedStreak = buildStreak(date);

        // storage.setItem(KEY, JSON.stringify(updatedStreak));
        updateStreak(storage, updatedStreak);

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  // const streak = {
  //   currentCount: 1,
  //   startDate: formatedDate(date),
  //   lastLoginDate: formatedDate(date),
  // };

  const streak = buildStreak(date);

  // store in the localstorage

  // storage.setItem(KEY, JSON.stringify(streak));
  updateStreak(storage, streak);

  return streak;
}
