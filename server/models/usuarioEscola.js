// log
console.log('usuario escola model registration started');

var UsuarioEscola = function (mongoose) {

    var Schema = mongoose.Schema;

    var UsuarioEscolaSchema = new Schema({
        // relationships
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        escola: { type: Schema.Types.ObjectId, ref: 'Escola' },
        perfil: { type: Schema.Types.ObjectId, ref: 'Perfil' },
    });

    // log
    console.log('usuario escola model registration finished');

    return mongoose.model('UsuarioEscola', UsuarioEscolaSchema);
};

module.exports = UsuarioEscola;