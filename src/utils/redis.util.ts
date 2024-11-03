import Redis from 'ioredis';

class RedisUtil {
  static redis: Redis;
  initialize() {
    RedisUtil.redis = new Redis();
  }
}

export { RedisUtil };
