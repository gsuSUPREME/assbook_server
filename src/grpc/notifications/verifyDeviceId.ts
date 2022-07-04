import {device, user} from '@helpers/prisma';
import {NotificationError, NotificationSuccess} from './notificationsState';

type ParamsTypes = 'userid' | 'deviceid';

export default async (data:{userid: number, deviceid: string}) => {
  for (let i = 0; i > Object.keys(data).length; i++) {
    debugger;
    if (data[(Object.keys(data)[i]) as ParamsTypes] === '' ||
    data[(Object.keys(data)[i]) as ParamsTypes] <= 0) {
      console.table(data);
      return new NotificationError(`Falta el campo ${Object.keys(data)[i]}`);
    }
  }
  for (const key in data) {
    if (data[key as ParamsTypes] === '' ||
    data[key as ParamsTypes] === 0) {
      console.table(data);
      return new NotificationError(`Falta el campo ${key}`);
    }
  }

  const User = await user.findUnique({
    where: {
      id: data.userid,
    },
  });
  if (!User) return new NotificationError('Este usuario no existe');
  const Device = await device.findUnique({
    where: {
      id: data.deviceid,
    },
  });
  if (!Device) {
    return new NotificationError('Este dispositivo no está registrado');
  };
  if (Device.userid !== data.userid) {
    return new NotificationError(
        'Este dispositivo no está vinculado a esta cuenta',
    );
  }
  return new NotificationSuccess();
};
