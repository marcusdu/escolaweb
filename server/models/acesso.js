// log
console.log('acesso model registration started');

var Acesso = function (mongoose) {
    var Schema = mongoose.Schema;

    var AcessoSchema = new Schema({
        // relationships
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        token: { type: String },
        ativo: { type: Boolean, default: true },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date, default: Date.now }
    });
    

    // log
    console.log('acesso model registration finished');

    return mongoose.model('Acesso', AcessoSchema);
};

module.exports = Acesso;