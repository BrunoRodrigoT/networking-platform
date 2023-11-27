import { Instance } from "@config";
import { ICourse } from "@models/Course";
const DEFAULT_PATH = "/course";

export default function useCourses() {
  const findCourses = async (): Promise<ICourse[]> => {
    return Instance.get(DEFAULT_PATH).then((res) => res.data);
  };

  return { findCourses };
}
