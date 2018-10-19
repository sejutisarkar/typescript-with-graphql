import {ResolverMap} from './types/graphql-utils';
import * as bcrypt from 'bcrypt';
import {User} from './entity/User';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_,{name}: any) => `Hello ${name || "world"}`
  },
  Mutation: {
    register: async (
      _,
      { email, password }: any
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });

      await user.save();
      return true;
    }
  }
};
