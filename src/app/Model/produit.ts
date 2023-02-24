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
    quantite_disponible: number | undefined;
    type?: string;
    boutique?: Boutiques;
    categorie?: Categorie

}
