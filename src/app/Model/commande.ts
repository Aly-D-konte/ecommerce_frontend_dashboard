import { Panier } from "./panier";
import { User } from "./user";

export class Commande {
    id?: number;
    code?:string;
    date?: Date;
   // statut? : Statut
    user_id?: User
    panier_id?: Panier


}
