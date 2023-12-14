import { calculateCollectionSchedule } from "../utils/helpers.js";

describe("helpers.js", () => {
  describe("calculateCollectionSchedule", () => {
    test.each`
      plannedCollectionDate | expected
      ${"2023-12-27"}       | ${["Non-recyclable", "Paper and cardboard", "Food waste"]}
      ${"2023-12-20"}       | ${["Garden waste", "Plastic, cans and glass", "Food waste"]}
      ${"2024-01-03"}       | ${["Garden waste", "Plastic, cans and glass", "Food waste"]}
    `(
      "returns correct list of bins for the planned collection date",
      ({ plannedCollectionDate, expected }) => {
        console.log(plannedCollectionDate);
        expect(calculateCollectionSchedule(plannedCollectionDate)).toEqual(
          expected
        );
      }
    );
  });
});
