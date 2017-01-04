// log
console.log('aluno model registration started');

var Aluno = function (mongoose) {
    var Schema = mongoose.Schema;
    var AlunoSchema = new Schema({
        // relationships

        // properties
        nome: { type: String },
        pai: {
            nome: { type: String },
            telefone: { type: String },
            email: { type: String }
        },
        mae: {
            nome: { type: String },
            telefone: { type: String },
            email: { type: String }
        },
        endereco: {
            rua: {
                type: String
            },
            bairro: {
                type: String
            },
            cidade: {
                type: String
            },
            estado: {
                type: Schema.Types.ObjectId,
                ref: 'Estado'
            },
            pais: { type: String },
            cep: { type: String }
        },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date, default: Date.now }
    });

    // log
    console.log('aluno model registration finished');

    return mongoose.model('Aluno', AlunoSchema);
};

module.exports = Aluno;