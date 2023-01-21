import { User } from "./user";

export class Boutiques {
    id?:number;
    nom?:string;
    description?:string;
    adresse?:string;
    image?: string;
    etat?: boolean;
    user_id?: User

}
