import { request } from "graphql-request";
import {assert} from 'chai';
import { host } from "./constants";
import { User } from "../entity/User";
import { createTypeormConn } from "../utils/createTypeormConn";

beforeAll(async () => {
  await createTypeormConn();
});

const email = "test122@bob.com";
const password = "jalksdf";

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test("Register user", async() => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  // console.log(email);
  const users =  await User.find({where: {email : 'test12@bob.com'}})
  // const users = await User.find({ where: {email: 'test12@bob.com'}});
  console.log(users);
  // assert.lengthOf(users,1);
  // const user = users[0];
  // expect(user.email).toEqual(email);
  // expect(user.password).not.toEqual(password);
});
