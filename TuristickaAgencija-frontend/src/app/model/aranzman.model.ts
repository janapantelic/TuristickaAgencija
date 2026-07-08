import { Hotel } from "./hotel.model";
import { TuristickaAgencija } from "./turistickaAgencija.model";

export class Aranzman {
    id!: number;
    ukupnaCena!: number;
    placeno!: boolean;
    datumRealizacije!: Date;
    hotel!: Hotel;
    turistickaAgencija!: TuristickaAgencija;
}