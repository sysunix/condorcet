import { when } from "jest-when";

import { MOCK_POLL_ID, MOCK_USER_ID, MOCK_POLL } from "../utils/test";

const doc = jest.fn();
const votesSubDoc = jest.fn();
const resultsSubDoc = jest.fn();
const subCollection = jest.fn();

when(votesSubDoc)
  .calledWith(MOCK_USER_ID)
  .mockReturnValue({
    set: jest.fn(() => Promise.resolve())
  });

when(subCollection)
  .calledWith("votes")
  .mockReturnValue({
    doc: votesSubDoc
  });

when(resultsSubDoc)
  .calledWith("condorcet")
  .mockReturnValue({
    get: () => ({
      data: () => ({
        matrix: {
          zorro: {
            luffy: 1,
            sanji: 1
          },
          luffy: {
            zorro: 0,
            sanji: 1
          },
          sanji: {
            zorro: 0,
            luffy: 0
          }
        },
        ranking: [
          {
            rank: 1,
            value: "Zorro",
            slug: "zorro",
            wins: 1,
            equalities: 1
          },
          {
            rank: 2,
            value: "Luffy",
            slug: "luffy",
            wins: 1,
            equalities: 1
          },
          {
            rank: 3,
            value: "Sanji",
            slug: "sanji",
            wins: 0,
            equalities: 0
          }
        ]
      })
    })
  });

when(resultsSubDoc)
  .calledWith("uninominal")
  .mockReturnValue({
    get: () => ({
      data: () => ({
        ranking: [{ value: "luffy", rank: 1 }]
      })
    })
  });

when(subCollection)
  .calledWith("results")
  .mockReturnValue({
    doc: resultsSubDoc
  });

when(doc)
  .calledWith(MOCK_POLL_ID)
  .mockReturnValue({
    get: jest.fn(() => ({
      data: jest.fn(() => ({ ...MOCK_POLL, collection: subCollection }))
    })),
    collection: subCollection,
    set: jest.fn()
  });

module.exports = {
  auth: {
    signOut: jest.fn(() => Promise.resolve()),
    signInWithPopup: jest.fn(() => Promise.resolve({ user: "Smaug" })),
    useDeviceLanguage: jest.fn(),
    setPersistence: jest.fn(),
    onAuthStateChanged: jest.fn(() => ({ id: MOCK_USER_ID })),
    GoogleAuthProvider: jest.fn(),
    GithubAuthProvider: jest.fn(),
    FacebookAuthProvider: jest.fn(),
    Auth: {
      Persistence: { LOCAL: "LOCAL" }
    }
  },
  db: {
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        get: () => [
          {
            data: () => {}
          }
        ],
        orderBy: jest.fn(() => ({
          onSnapshot: jest.fn(() => [MOCK_POLL])
        }))
      })),
      add: jest.fn(() => Promise.resolve()),
      doc
    }))
  },
  firestore: {
    FieldValue: {
      serverTimestamp() {
        return {};
      }
    }
  }
};
