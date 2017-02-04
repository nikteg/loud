import { call, put } from "redux-saga/effects";
import * as Api from "../lib/api";

import {
  decodeToken,
  authLoginSaga,
} from "./auth";

import {
  login,
  AUTH_LOGIN,
} from "../actions";

const validToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjI1IiwiZXhwIjoxNDg4ODA3Mzc1LCJpYXQiOjE0ODYyMTUzNzUsImlkIjoyNSwiaXNzIjoiTG91ZCIsImp0aSI6IjU0MWZkYjFjLWI1NWYtNDhlYS05NWYxLTA0ZTU5YmU1ZDU3YyIsInBlbSI6e30sInN1YiI6IlVzZXI6MjUiLCJ0eXAiOiJ0b2tlbiIsInVzZXJuYW1lIjoiMTIzMTIzIn0.jCSMShXVCXu0gWLvvuk4fAKr9glgUfYaZ8GP3x0ibPqyZpikyks0ce4etOgjNWx2rMNiduDoSg4FeAwfpSqqmQ";

const invalidToken = "invalid.token";

const validDecodedToken = { id: 25, username: "123123", token: validToken };

test("decodeToken", () => {
  const valid = decodeToken(validToken);
  expect(valid).toEqual(validDecodedToken);
  expect(localStorage.getItem("token")).toEqual(validToken);
  expect(() => decodeToken(invalidToken)).toThrow();
});

test("authLoginSaga", () => {
  const gen = authLoginSaga(login("123123", "123123"));

  let next = gen.next();
  expect(next.value).toEqual(call(Api.login, "123123", "123123"));

  next = gen.next({ token: validToken });
  expect(next.value).toEqual(put(AUTH_LOGIN.complete(validDecodedToken)));
});
