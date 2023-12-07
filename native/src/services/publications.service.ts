import { Instance } from "@config";
import { IPublicationForm, IPublications } from "@models/Publications";
import { IError } from "@models/Request";

const DEFAULT_PATH = "/publication";

export default function usePublications() {
  const createPublication = async (
    data: IPublicationForm
  ): Promise<IPublicationForm> => {
    return Instance.post(DEFAULT_PATH, data).then((res) => res.data);
  };

  const findPublications = async (): Promise<IPublications[]> => {
    return Instance.get(DEFAULT_PATH).then((res) => res.data);
  };

  const findPublicationsByUser = async (
    user_id: string
  ): Promise<IPublications[]> => {
    return Instance.get(DEFAULT_PATH + "/" + user_id).then((res) => res.data);
  };

  const deletePublication = async (id: string): Promise<IError> => {
    return Instance.delete(DEFAULT_PATH + "/" + id).then((res) => res.data);
  };

  return { findPublications, findPublicationsByUser, createPublication, deletePublication };
}
