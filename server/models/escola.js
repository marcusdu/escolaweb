// log
console.log('escola model registration finished');

var Escola = function (mongoose) {

    var Schema = mongoose.Schema;

    var EscolaSchema = new Schema({
        // properties
        nome: { type: String },
        endereco: {
            // relationships
            estado: { type: Schema.Types.ObjectId, ref: 'Estado' },

            // properties
            rua: { type: String },
            bairro: { type: String },
            cidade: { type: String },            
            pais: { type: String },
            cep: { type: String }
        },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date, default: Date.now }
    });

    // log
    console.log('escola model registration finished');

    return mongoose.model('Escola', EscolaSchema);
};

module.exports = Escola;