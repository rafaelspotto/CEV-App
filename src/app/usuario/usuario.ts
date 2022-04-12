import { EntradaModule } from "../entrada/entrada.module";
import { ERole } from "./ERole";
import { Nucleo } from "../nucleo/nucleo";

export class Usuario {
    id: number;
    username: string;
    password: string;
    email: string;
    ativo: boolean;
    roles: string[] = [];
    nucleo: Nucleo;
}
