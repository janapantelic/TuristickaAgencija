import { Destinacija } from "./destinacija.model";

export class Hotel {
    id!: number;
    naziv!: string;
    brojZvezdica!: number;
    opis!: string;
    destinacija!: Destinacija;
}