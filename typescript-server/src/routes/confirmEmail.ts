import { Response, Request} from 'express';
import {User} from '../entity/User';
import {redisClient} from '../redis';

export const confirmEmail = async(req: Request, res: Response) => {
  const { id } = req.params;
  await redisClient.get(id,async (err, result) => {
    if(err){
      res.send("invalid")
    }
    else{
      await User.update({ id: result }, { confirmed: true });
      res.send("ok");
    }
  });
}
