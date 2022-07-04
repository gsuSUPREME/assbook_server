import {UserError} from '@helpers/models/User_Model';
import {device} from '@helpers/prisma';
import {randomUUID} from 'crypto';

type ParamsTypes = 'type' | 'ip' | 'name' | 'userid';
/**
 * Controlador para los dispositivos
 */
export default class DeviceController {
  /**
   * Añadir dispositivo a la lista
   * @param {IParams} data - Id del usuario
   * return {Device}
  */
  public static async addDevice(data: {
    type: string,
    ip: string,
    name: string,
    userid: number
  }) {
    Object.keys(data).forEach((key: string, i) => {
      if (!(data[key as ParamsTypes])) {
        return new UserError('falta el parametro ' + key);
      }
    });
    const Device = await device.create({
      data: {
        id: randomUUID(),
        type: data.type,
        ip: data.ip,
        name: data.name,
        userid: data.userid,
      },
    },
    );
    return Device;
  }
}
