import { ICourse } from "@models/Course";
import Instance from "src/config/api";
const DEFAULT_PATH = "/course";

export default function useCourses() {
  const findCourses = async (): Promise<ICourse[]> => {
    return Instance.get(DEFAULT_PATH).then((res) => res.data);
  };

  return {};
}
