export const BINS_DATA = [
  {
    name: "Non-recyclable",
    url: "/images/type-general-waste-green-bin.png",
  },
  {
    name: "Plastic, cans and glass",
    url: "/images/type-recycling-bin-white-lid.png",
  },
  {
    name: "Food waste",
    url: "/images/type-food-waste.png",
  },
  {
    name: "Garden waste",
    url: "/images/type-garden-waste-brown-bin.png",
  },
  {
    name: "Paper and cardboard",
    url: "/images/type-recycling-bin-blue-lid.png",
  },
];

export const SCHEDULE = {
  startingDate: "2023-12-06", // weekBrown is scheduled at that date
  weekGreen: ["Non-recyclable", "Paper and cardboard", "Food waste"],
  weekBrown: ["Garden waste", "Plastic, cans and glass", "Food waste"],
};
