import { post, profile, user } from "../helpers/prisma";
import {
  UserError,
  UserState,
  UserSuccessfull,
} from "../helpers/models/User_Model";

export default class UserController {
  static async getUser(userid: number): Promise<UserState> {
    if (!userid) return new UserError("falta el campo 'userid' gf");
    const u = await user.findUnique({
      where: { id: userid },
      include: {
        posts: true,
        profile: true,
        friends: true,
      },
    });
    if (!u) return new UserError("este usuario no existe puta");
    return new UserSuccessfull(u);
  }
  static async deleteUser(userid: number): Promise<UserState> {
    if (!userid) return new UserError("aqui falta el campo 'userid' puta");
    const u = await user.findUnique({
      where: { id: userid },
    });
    if (!u) return new UserError("este usuario no existe puta");
    await user.delete({ where: { id: userid } });
    return new UserSuccessfull(u);
  }
  static async createUser(data: {
    username: string;
    email: string;
    name: string;
    password: string;
    phone?: string;
    bio?: string;
  }): Promise<UserState> {
    if (!data.email)
      return new UserError("Te falta el campo 'email' retrasado");
    if (!data.name) return new UserError("Te falta el campo 'name' retrasado");
    if (
      data.name.includes("0") ||
      data.name.includes("1") ||
      data.name.includes("2") ||
      data.name.includes("3") ||
      data.name.includes("4") ||
      data.name.includes("5") ||
      data.name.includes("6") ||
      data.name.includes("7") ||
      data.name.includes("8") ||
      data.name.includes("9") ||
      data.name.includes("@") ||
      data.name.includes("&") ||
      data.name.includes("%") ||
      data.name.includes("$") ||
      data.name.includes("#") ||
      data.name.includes("!") ||
      data.name.includes("=")
    )
      return new UserError("Ese nombre es invalido, retrasado");

    if (!data.password)
      return new UserError("Te falta el campo 'password' retrasado");
    if (!data.username)
      return new UserError("Te falta el campo 'username' retrasado");
    if (await user.findUnique({ where: { email: data.email } })) {
      return new UserError(
        "Este email ya está en uso, te recuerdo que existe ¿Olvidó su contraseña?"
      );
    }

    if (await user.findUnique({ where: { username: data.username } })) {
      return new UserError(
        "Este nombre de usuario ya está en uso, se original"
      );
    }
    if (
      data.phone &&
      (await user.findUnique({ where: { email: data.phone } }))
    ) {
      return new UserError("Este número se encuentra en uso, idiota");
    }
    const newUser = await user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        username: data.username,
        phone: data.phone,
        profile: {
          create: {
            bio: data.bio || "",
          },
        },
      },
    });
    return new UserSuccessfull(newUser);
  }
  static async logInUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<UserState> {
    if (!username) return new UserError("te falta el campo username retrasado");
    if (!password) return new UserError("te falta el campo password retrasado");
    const u = await user.findUnique({ where: { username: username } });
    if (!u) return new UserError("este usuario no existe sorra");
    if (u.password !== password)
      return new UserError("esta no es la contraseña retrasada");
    return new UserSuccessfull(u);
  }
}
