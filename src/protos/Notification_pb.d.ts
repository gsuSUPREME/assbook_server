// package: 
// file: Notification.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PushNotificationRequest extends jspb.Message { 

    hasNotification(): boolean;
    clearNotification(): void;
    getNotification(): Notification | undefined;
    setNotification(value?: Notification): PushNotificationRequest;
    getUserid(): number;
    setUserid(value: number): PushNotificationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushNotificationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PushNotificationRequest): PushNotificationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushNotificationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushNotificationRequest;
    static deserializeBinaryFromReader(message: PushNotificationRequest, reader: jspb.BinaryReader): PushNotificationRequest;
}

export namespace PushNotificationRequest {
    export type AsObject = {
        notification?: Notification.AsObject,
        userid: number,
    }
}

export class PushNotificationResponse extends jspb.Message { 
    getIssended(): boolean;
    setIssended(value: boolean): PushNotificationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushNotificationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PushNotificationResponse): PushNotificationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushNotificationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushNotificationResponse;
    static deserializeBinaryFromReader(message: PushNotificationResponse, reader: jspb.BinaryReader): PushNotificationResponse;
}

export namespace PushNotificationResponse {
    export type AsObject = {
        issended: boolean,
    }
}

export class SubscribeRequest extends jspb.Message { 
    getDeviceid(): string;
    setDeviceid(value: string): SubscribeRequest;
    getNotificationchannel(): string;
    setNotificationchannel(value: string): SubscribeRequest;
    getUserid(): number;
    setUserid(value: number): SubscribeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeRequest): SubscribeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeRequest;
    static deserializeBinaryFromReader(message: SubscribeRequest, reader: jspb.BinaryReader): SubscribeRequest;
}

export namespace SubscribeRequest {
    export type AsObject = {
        deviceid: string,
        notificationchannel: string,
        userid: number,
    }
}

export class Notification extends jspb.Message { 
    getType(): string;
    setType(value: string): Notification;
    getId(): number;
    setId(value: number): Notification;
    getMessage(): string;
    setMessage(value: string): Notification;
    getUserid(): number;
    setUserid(value: number): Notification;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Notification.AsObject;
    static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Notification;
    static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
}

export namespace Notification {
    export type AsObject = {
        type: string,
        id: number,
        message: string,
        userid: number,
    }
}
