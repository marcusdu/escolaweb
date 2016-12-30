var Estado = function(mongoose){
    var Schema = mongoose.Schema;

    var EstadoSchema = new Schema({
        // relationships

        nome:{ type: String },
        sigla: { type: String },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date,  default: Date.now }
    });

    return mongoose.model('Estado', EstadoSchema);
};

module.exports = Estado;