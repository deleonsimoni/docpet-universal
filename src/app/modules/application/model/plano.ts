export interface Plano {
    id?: String,
    nome: String,
    nomeFormated: String,
    descricao: String,
    cobranca: {
        valor: String,
        parcela: Boolean,
        quantidadeParcela: Number,
        cupom: String,
    },
    caracteristicas: [{
        titulo: String,
        descricao: String,
    }],

    diasVencimento: Date,
    status: Boolean,
}
