// log
console.log('professor model registration started');

var Professor = function (mongoose) {
    var Schema = mongoose.Schema;
    var ProfessorSchema = new Schema({
        // relationships

        // properties
        nome: { type: String },
        telefone: { type: String },
        email: { type: String },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date, default: Date.now }
    });

    // log
    console.log('professor model registration finished');

    return mongoose.model('Professor', ProfessorSchema);
};

module.exports = Professor;