import _get from "lodash/get";
import frLocal from "../locales/fr.json";

export const MOCK_POLL_ID = "MOCK_POLL_ID";

export const MOCK_USER_ID = "MOCK_USER_ID";

export const MOCK_TOKEN = "MOCK_TOKEN";

export const MOCK_TIMESTAMP = { seconds: 1559325107, nanoseconds: 154000000 };

export const MOCK_ANSWERS = [
  { slug: "luffy", value: "Luffy" },
  { slug: "zorro", value: "Zorro" },
  { slug: "sanji", value: "Sanji" }
];

export const MOCK_POLL = {
  isActive: true,
  isOwner: false,
  answers: MOCK_ANSWERS,
  description: "Qui repellendus est aliquam vel qui.",
  isPublic: true,
  owner: MOCK_USER_ID,
  question: "Qui est le meilleur ?",
  timestamp: MOCK_TIMESTAMP,
  token: MOCK_TOKEN,
  users: [MOCK_USER_ID]
};

export const getTranslation = path => _get(frLocal, path);
