import { Veterinario } from './veterinario';
import { Endereco } from './endereco';
import { Contato } from './contato';
export interface Estabelecimento {
    id?: String,
    atendePlano: Boolean,
    cnpj: String,
    nome: String,
    contato: Contato,
    endereco: Endereco,
    especialidade: [],
    veterinarios: [Veterinario],
    img: String,
    location: {
        coordinates: [0, 0]
    },
    sobre: [null],
}
