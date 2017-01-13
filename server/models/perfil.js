// log
console.log('perfil model registration started');


var Perfil = function (mongoose) {
    var Schema = mongoose.Schema;

    var perfilSchema = new Schema({
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
        collection: 'perfis'
    });

    // log
    console.log('perfil model registration finished');

    return mongoose.model('Perfil', perfilSchema);
};

module.exports = Perfil;