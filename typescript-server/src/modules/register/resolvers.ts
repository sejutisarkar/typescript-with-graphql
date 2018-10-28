import {ResolverMap} from '../../types/graphql-utils';
import * as bcrypt from 'bcrypt';
import {User} from '../../entity/User';
import * as yup from 'yup';
import {formatYupErrors} from '../../utils/formatYupErrors';
import {createConfirmEmailLink} from '../../utils/createConfirmEmailLink';
import {sendEmail} from '../../utils/sendEmail';
const schema = yup.object().shape({
  email: yup
    .string()
    .min(3,'bad email')
    .max(255)
    .email(),
  password: yup
      .string()
      .min(3)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => 'bye'
  },
  Mutation: {
    register: async (
      _,
      args: any,
      {redis, url}
    ) => {
      try{
        await schema.validate(args,{abortEarly: false});
      }catch(err){
        // console.log(err);
        return formatYupErrors(err);
      }
      const {email, password} = args;
      const userAlreadyExist = await User.findOne({
        where: {email},
        select: ["id"]
      });
      if(userAlreadyExist){
        return [
          {
            path:'email',
            message:'email already taken'
          }
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });

      await user.save();

      await sendEmail(email, await createConfirmEmailLink(url,user.id,redis));
      return null;
    }
  }
};
