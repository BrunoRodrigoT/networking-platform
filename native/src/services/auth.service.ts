import { Instance } from "@config";
import { IUserSignUp, IUser, IUserSignIn, IUserSigned } from "@models/Auth";
const DEFAULT_PATH = "/auth";

export default function UseAuth() {
  const userSignIn = async (data: IUserSignIn): Promise<IUserSigned> => {
    return Instance.post(DEFAULT_PATH + "/login", data).then((res) => res.data);
  };

  const userSignUp = async (data: IUserSignUp): Promise<IUser> => {
    return Instance.post(DEFAULT_PATH + "/register", data).then(
      (res) => res.data
    );
  };

  return { userSignIn, userSignUp };
}
