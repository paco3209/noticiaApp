var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	titulo: {type: String, required: true},
	descripcion: {type: String, required: true},
	link: {type: String, required: true},
	dia: {type: Date},
	votos: {type: Number},
	categoria: {type: String, required: true}


});

module.exports = mongoose.model('noticia', schema);
