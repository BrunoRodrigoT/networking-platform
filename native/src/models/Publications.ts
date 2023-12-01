import { IUser } from "./Auth";
import { ICompany } from "./Company";
import { ICourse } from "./Course";

interface IPublications {
  id: number;
  title: string;
  description: string;
  tags: string[];
  user_id: string;
  user: IUser;
  company_id: string;
  company: ICompany;
  course_id: string;
  course: ICourse;
  updatedAt: string;
  createdAt: string;
}

interface IPublicationForm
  extends Omit<
    IPublications,
    "id" | "user" | "company" | "course" | "created_at" | "updated_at"
  > {}

export { IPublications, IPublicationForm };
