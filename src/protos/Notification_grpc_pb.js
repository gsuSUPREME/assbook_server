// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Notification_pb = require('./Notification_pb.js');

function serialize_Notification(arg) {
  if (!(arg instanceof Notification_pb.Notification)) {
    throw new Error('Expected argument of type Notification');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Notification(buffer_arg) {
  return Notification_pb.Notification.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SubscribeRequest(arg) {
  if (!(arg instanceof Notification_pb.SubscribeRequest)) {
    throw new Error('Expected argument of type SubscribeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SubscribeRequest(buffer_arg) {
  return Notification_pb.SubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationsService = exports.NotificationsService = {
  subscribe: {
    path: '/Notifications/Subscribe',
    requestStream: false,
    responseStream: true,
    requestType: Notification_pb.SubscribeRequest,
    responseType: Notification_pb.Notification,
    requestSerialize: serialize_SubscribeRequest,
    requestDeserialize: deserialize_SubscribeRequest,
    responseSerialize: serialize_Notification,
    responseDeserialize: deserialize_Notification,
  },
};

exports.NotificationsClient = grpc.makeGenericClientConstructor(NotificationsService);
