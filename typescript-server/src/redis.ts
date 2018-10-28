import * as redis from 'redis';

export const redisClient = redis.createClient(6379);
redisClient.on('connect',()=>{
  console.log('connected')
})
