// package: 
// file: Notification.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as Notification_pb from "./Notification_pb";

interface INotificationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    subscribe: INotificationsService_ISubscribe;
}

interface INotificationsService_ISubscribe extends grpc.MethodDefinition<Notification_pb.SubscribeRequest, Notification_pb.Notification> {
    path: "/Notifications/Subscribe";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<Notification_pb.SubscribeRequest>;
    requestDeserialize: grpc.deserialize<Notification_pb.SubscribeRequest>;
    responseSerialize: grpc.serialize<Notification_pb.Notification>;
    responseDeserialize: grpc.deserialize<Notification_pb.Notification>;
}

export const NotificationsService: INotificationsService;

export interface INotificationsServer {
    subscribe: grpc.handleServerStreamingCall<Notification_pb.SubscribeRequest, Notification_pb.Notification>;
}

export interface INotificationsClient {
    subscribe(request: Notification_pb.SubscribeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Notification_pb.Notification>;
    subscribe(request: Notification_pb.SubscribeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Notification_pb.Notification>;
}

export class NotificationsClient extends grpc.Client implements INotificationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public subscribe(request: Notification_pb.SubscribeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Notification_pb.Notification>;
    public subscribe(request: Notification_pb.SubscribeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Notification_pb.Notification>;
}
