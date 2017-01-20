// log
console.log('serie model registration started');


var Serie = function (mongoose) {
    var Schema = mongoose.Schema;

    var SerieSchema = new Schema({
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
        collection: 'series'
    });

    // log
    console.log('serie model registration finished');

    return mongoose.model('Serie', SerieSchema);
};

module.exports = Serie;