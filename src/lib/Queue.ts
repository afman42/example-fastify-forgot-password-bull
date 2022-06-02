import Queue from 'bull';
import redisConfig from '../config/redis';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull:new BullAdapter(new Queue(job.key, {
    redis: redisConfig
  })),
  nameJob: job.key,
  handle: job.handle,
  options: job.options,
}))

export default {
  queues,
  add(name, data) {
    const queu = this.queues.find(quee => quee.nameJob === name);
    
    return queu.bull.queue.add(data, queu.options);
  },
  process() {
    return this.queues.forEach(queu => {
      // console.log(queu.bull.queue.process(queu.handle))
      queu.bull.queue.process(queu.handle);

      queu.bull.queue.on('failed', (job, err) => {
        console.log('Job failed', queu.key, job.data);
        console.log(err);
      });
    })
  }
};