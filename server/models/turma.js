// log
console.log('turma model registration started');

var Turma = function (mongoose) {
    var Schema = mongoose.Schema;

    var TurmaSchema = new Schema({
        // relationships
        serie: { type: Schema.Types.ObjectId, ref: 'Serie'},

        // properties
        turno: { type: String, require: [true, 'Campo obrigatório!']},
        nome: {
            type: String,
            required: [true, 'Campo obrigatório!'],
            unique: [true, 'Nome já cadastrado!']
        },
        ativo: {
            type: Boolean,
            required: [true, 'Campo obrigatório!']
        }
    }, {
        // pluralizar corretamente
        collection: 'turmas'
    });

    // log
    console.log('turma model registration finished');

    return mongoose.model('Turma', TurmaSchema);
};

module.exports = Turma;