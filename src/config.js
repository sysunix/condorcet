export default {
  notificationTimeout: 3000,
  featureFlipping: {
    publicPolls: process.env.NODE_ENV === "development" ? true : false,
    graphOfTheDuels: false,
    matrixOfTheDuels: true,
    condorcetRanking: true,
    uninominalRanking: true
  }
};
