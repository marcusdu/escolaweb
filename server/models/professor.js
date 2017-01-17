// log
console.log('professor model registration started');

var Professor = function (mongoose) {
    var Schema = mongoose.Schema;
    var ProfessorSchema = new Schema({
        // relationships
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario'},

        // properties
        disciplina: { type: String, required: [true, 'Campo obrigatório!']}
    });

    // log
    console.log('professor model registration finished');

    return mongoose.model('Professor', ProfessorSchema);
};

module.exports = Professor;