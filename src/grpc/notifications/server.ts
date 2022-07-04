/* eslint-disable require-jsdoc */
import {prisma} from '@helpers/prisma';
import * as grpc from 'grpc';
import {EventEmitter} from 'stream';
import {
  INotificationsServer,
  NotificationsService} from '../../protos/Notification_grpc_pb';
import {Notification,
  SubscribeRequest} from '../../protos/Notification_pb';
import {NotificationError} from './notificationsState';
import verifyDeviceId from './verifyDeviceId';

const server = new grpc.Server();

const eventEmitter = new EventEmitter();

prisma.$use(async (params, next) => {
  console.log('in middleware');
  if (params.model === 'Post' && params.action === 'create') {
    console.log('in if');
    const res = new Notification();
    res.setId(4);
    res.setMessage('new Post');
    res.setUserid(params.args.data.authorId);
    res.setType('post_created');
    eventEmitter.emit('newNotification', res);
  }
  return next(params);
});

eventEmitter.on('newNotification', (noti: Notification) => {
  console.log(eventEmitter.listenerCount('newNotification'));
});

class NotificationsServer implements INotificationsServer {
  urls: Object[] = [];
  async subscribe(
      call: grpc.ServerWritableStream<SubscribeRequest, Notification>,
  ) {
    const verified = await verifyDeviceId(
        {
          userid: call.request.getUserid(),
          deviceid: call.request.getDeviceid(),
        },
    );
    console.log(call.eventNames());
    if (verified instanceof NotificationError) {
      const res = new Notification();
      res.setType('error');
      res.setMessage(verified.message);
      call.write(res);
      call.end();
      return;
    }
    function sendNotification(noti: Notification) {
      if (noti.getUserid() === call.request.getUserid()) {
        call.write(noti);
      }
    }
    eventEmitter.on('newNotification', sendNotification);
    call.addListener('finish', () => {
      console.log('finished');
      eventEmitter.removeListener('newNotification', sendNotification);
    });
  }
}

// @ts-ignore
server.addService(
    NotificationsService,
    new NotificationsServer(),
);

export default server;
