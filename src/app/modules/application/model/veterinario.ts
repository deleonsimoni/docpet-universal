import { Contato } from './contato';
import { Endereco } from './endereco';
import { Estabelecimento } from './estabelecimento';
export interface Veterinario {
    id?: String,
    nome: String,
    nomeFormated: String,
    crmv: String,
    img: String;
    atendePlano: Boolean,
    contato: Contato,
    endereco: Endereco,
    uf: String,
    especialidade: [],
    estabelecimentos: [Estabelecimento],
    user: any,
    avatar: any,

    sobre: {
        type: String,
        require: true
    },

    formacoes: [{
        nomeInstituicao: String,
        curso: String,
        anoInicio: Number,
        anoFim: Number
    }],

    experiencias: [{
        nomeEstabelecimento: String,
        anoInicio: Number,
        anoFim: Number,
    }],

    conquistas: [{
        nome: String,
        mes: Number,
        ano: Number,
        descricao: String,
    }],
    location: {
        coordinates: [0, 0]
    }
}
