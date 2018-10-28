import "reflect-metadata";
import 'dotenv/config';
import { GraphQLServer } from "graphql-yoga";
import * as redis from 'redis';
import { createTypeormConn } from "./utils/createTypeormConn";
import {confirmEmail} from './routes/confirmEmail';
import {genSchema} from './utils/genSchema';

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });
  server.express.get("/confirm/:id", confirmEmail);
  await createTypeormConn();
  await server.start();
  console.log("Server is running on localhost:4000");
};

startServer();
