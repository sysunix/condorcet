// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyBl7KGWaRY0B-BQ7WhUwSnmFHj3f3OYF0U",
  authDomain: "condorcet-4167c.firebaseapp.com",
  databaseURL: "https://condorcet-4167c.firebaseio.com",
  projectId: "condorcet-4167c",
  storageBucket: "condorcet-4167c.appspot.com",
  messagingSenderId: 400396103060
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
