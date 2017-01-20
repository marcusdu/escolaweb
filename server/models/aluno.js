// log
console.log('aluno model registration started');

var Aluno = function (mongoose) {
    var Schema = mongoose.Schema;
    var AlunoSchema = new Schema({
        // relationships
        escola: { type: Schema.Types.ObjectId, ref: 'Escola', required: [true, 'Campo obrigatório!']},
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Campo obrigatório!']},
        turma: { type: Schema.Types.ObjectId, ref: 'Turma' },

        // properties
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
        }
    });

    // log
    console.log('aluno model registration finished');

    return mongoose.model('Aluno', AlunoSchema);
};

module.exports = Aluno;