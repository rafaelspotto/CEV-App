import { Entrada } from "../entrada/entrada";
import { Nucleo } from "../nucleo/nucleo";

export class Vegetal {
    id: number;
    descricao: string;
    numero: number;
    ano: number;
    quantidade: string;
    quantidadeEntrada: string;
    tipoMariri: string;
    ativo: Boolean;
    entrada:Entrada;
    nucleo: Nucleo;
}
