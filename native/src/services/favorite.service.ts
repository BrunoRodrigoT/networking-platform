import { Instance } from "@config";
import { ICreateFavorite, IFavorite } from "@models/Favorite";
import { IError } from "@models/Request";

const DEFAULT_PATH = "/favorite";

export default function useFavorite() {
    const createFavorite = async (data: ICreateFavorite): Promise<IFavorite> => {
        return Instance.post(DEFAULT_PATH, data).then((res) => res.data);
    };
    const removeFavorite = async (id: string): Promise<IError> => {
        return Instance.delete(DEFAULT_PATH + "/" + id).then((res) => res.data);
    };
    const findFavorites = async (): Promise<IFavorite[]> => {
        return Instance.get(DEFAULT_PATH).then((res) => res.data);
    };

    return { createFavorite, findFavorites, removeFavorite };
}