var Escola = function(mongoose){
    
    var Schema = mongoose.Schema;

    var EscolaSchema = new Schema({
        // relationships

        // properties
        nome:{ type: String },
        endereco: {
            rua: {
                type: String
            },
            bairro:{
                type: String
            },
            cidade: {
                type: String
            },
            estado: {
                type: Schema.Types.ObjectId,
                ref: 'Estado'
            },
            pais:{ type: String },
            cep: { type: String }
        },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date,  default: Date.now }
    });

    console.log('Schema registration');
    return mongoose.model('Escola', EscolaSchema);
};

module.exports = Escola;