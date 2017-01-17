// modulos

// log
console.log('usuario model registration started');

var passportLocalMongoose = require('passport-local-mongoose');

var Usuario = function (mongoose) {
    // schema generation function
    var Schema = mongoose.Schema;

    // optional to define custom properties in the Usuario model
    var UsuarioSchema = new Schema({
        // relationships

        // properties
        nome: { type: String, required: [true, 'Campo obrigatório!']},
        apelido: { type: String, required: [true, 'Campo obrigatório!']},
        email: { type: String, require: [true, 'Campo obrigatório!'] },
        emailConfirmado: { type: Boolean },
        ativo: { type: Boolean },
        dataCriacao: { type: Date, default: Date.now },
        dataAtualizacao: { type: Date,  default: Date.now },
        contato: {
            telefoneFixo: { type: String },
            telefoneCelular: { type: String, required: [true, 'Campo obrigatório!'] }
        }
    });

    UsuarioSchema.plugin(passportLocalMongoose, {
        usernameField: 'email',
        hashField: 'password_hash',
        saltField: 'salt',
        usernameLowerCase: true
    });

    // log
    console.log('usuario model registration stopped');

    // return local mongoose model
    return mongoose.model('Usuario', UsuarioSchema);
};

module.exports = Usuario;