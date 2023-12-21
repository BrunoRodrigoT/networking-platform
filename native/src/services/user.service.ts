import { Instance } from "@config";
import { IUser } from "@models/Auth";
const DEFAULT_PATH = "/user";

export default function UseUser() {
    const findUserById = async (id: string): Promise<IUser> => {
        return Instance.get(DEFAULT_PATH + "/" + id).then((res) => res.data);
    };

    const findUsers = async (params: string): Promise<IUser[]> => {
        return Instance.get(DEFAULT_PATH, { params: { query: params } }).then((res) => res.data);
    }
    return { findUserById, findUsers };
}
