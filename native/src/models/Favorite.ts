import { IUser } from "./Auth";
import { ICompany } from "./Company";
import { ICourse } from "./Course";
import { IPublications } from "./Publications";

export interface IFavorite {
    id: string;
    user_id: string;
    publication_id: string;
    publication: IPublications;
    user: IUser;
    course: ICourse;
    company: ICompany;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateFavorite {
    publication_id: string;
}