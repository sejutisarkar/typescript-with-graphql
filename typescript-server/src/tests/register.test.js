import { request } from "graphql-request";
import {assert} from 'chai';
import { host } from "./constants";
import { User } from "../entity/User";
import { createTypeormConn } from "../utils/createTypeormConn";

beforeAll(async () => {
  await createTypeormConn();
});

const email = "test18@bob.com";
const password = "jertyu";

const mutation = (e ,p) => `
mutation {
  register(email: "${e}", password: "${p}"){
    path
    message
  }
}
`;

test("Register user", async() => {
  const response = await request(host, mutation(email,password));
  expect(response).toEqual({ register: null });
  // console.log(email);
  const users =  await User.find({where: {email : email}});
  console.log(users);
  assert.lengthOf(users,1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);

  const response2 = await request(host, mutation(email,password));
  assert.lengthOf(response2.register,1);
  expect(response2.register[0].path).toEqual('email');
});
