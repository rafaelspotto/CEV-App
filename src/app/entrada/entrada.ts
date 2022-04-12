import { NumberValueAccessor } from "@angular/forms";
import { Vegetal } from "../vegetal/vegetal";
import { Nucleo } from "../nucleo/nucleo";

export class Entrada {
    id: number;
    descricao:string;
    dataEntrada:Date;
    tipoEntrada:string;
    listaVegetal:Vegetal[];
    nucleo:Nucleo;

}
