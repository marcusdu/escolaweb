// log
console.log('estado model registration started');

var Estado = function (mongoose) {
    var Schema = mongoose.Schema;

    var EstadoSchema = new Schema({
        // relationships

        nome: { type: String },
        sigla: { type: String },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date, default: Date.now }
    });

    // log
    console.log('estado model registration finished');

    return mongoose.model('Estado', EstadoSchema);
};

module.exports = Estado;