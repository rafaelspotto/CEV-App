import { NumberValueAccessor } from '@angular/forms';
import { Nucleo } from '../nucleo/nucleo';
import { Vegetal } from '../vegetal/vegetal';
import { SaidaVegetal } from './saidaVegetal';

export class Saida {
    id: number;
    descricao:string;
    dataSaida:string;
    tipoSaida:string;
    saidaVegetal:SaidaVegetal[];
    vegetalUnido:Vegetal;
    totalSaida: number;
    numeroPessoas: number;
    nucleo: Nucleo;
}
