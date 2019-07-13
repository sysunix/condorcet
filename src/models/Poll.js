export const PollModel = {
  answers: "required|array|min:2",
  "answers.*.slug": "required|string",
  "answers.*.value": "required|string",
  description: "string",
  isActive: "required|boolean",
  isPublic: "required|boolean",
  owner: "required|string",
  question: "required|string",
  token: "required|string",
  users: "required|array",
  timestamp: "object"
};
