import { Boutiques } from "./boutiques";
import { Categorie } from "./categorie";
import { User } from "./user";

export class Produit {

    id?: number;
    nom?:string;
    description?: string;
    marque?:string;
    prix?: number;
    modele?: string;
    capacite?: string;
    quantite_disponible?: number;
    type?: string;
    boutique_id ?: Boutiques;
    user_id?: User;
    categorie_id?: Categorie

}
