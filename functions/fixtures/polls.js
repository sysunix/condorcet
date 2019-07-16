const uuid = require("uuid/v1");
const slugify = require("slugify");
const faker = require("faker");
const random = require("./random");
const { admin } = require("../config/firebase");

let { USER_ID, NUMBER_OF_POLLS, NUMBER_OF_ANSWERS } = process.env;

NUMBER_OF_POLLS = parseInt(NUMBER_OF_POLLS);
NUMBER_OF_ANSWERS = parseInt(NUMBER_OF_ANSWERS);

const numberOfAnswers = random(NUMBER_OF_ANSWERS - 3, NUMBER_OF_ANSWERS + 3);

module.exports = () => {
  return Array(NUMBER_OF_POLLS)
    .fill()
    .map(() => {
      const answers = Array(numberOfAnswers)
        .fill()
        .map(() => {
          const value = faker.lorem.sentence();
          return {
            value,
            slug: slugify(value)
          };
        });

      return {
        answers,
        description: faker.lorem.paragraph(),
        isActive: true,
        isPublic: faker.random.boolean(),
        question: faker.lorem.sentence(),
        owner: USER_ID,
        token: uuid(),
        users: [USER_ID],
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      };
    });
};
