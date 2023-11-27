import { Instance } from "@config";
import { ICompany } from "@models/Company";
const DEFAULT_PATH = "/company";

export default function useCompany() {
  const findCompanies = async (): Promise<ICompany[]> => {
    return Instance.get(DEFAULT_PATH).then((res) => res.data);
  };

  return { findCompanies };
}
