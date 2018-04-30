var express = require('express');
var router = express.Router();
var noticia = require('../models/noticia');
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
   noticia.find(function(err, docs) {
   		var productChunks = [];
   		var chunkSize = 15;
   		for(var i = 0; i < docs.length ; i += chunkSize){
   			productChunks.push(docs.slice(i,i + chunkSize))
   		}
  		res.render('noticias/index',{products: productChunks});
   });

});

router.get('/getSort', (req,res,next) => {
	noticia.find().sort({votos: -1}).exec( function(err, docs) {
   		var productChunks = [];
   		var chunkSize = 15;
   		for(var i = 0; i < docs.length ; i += chunkSize){
   			productChunks.push(docs.slice(i,i + chunkSize))
   		}
  		res.render('noticias/index',{products: productChunks});
   });
})

router.get('/getSortByData',(req,res, next)=>{
	noticia.find().sort({dia: -1}).exec( function(err, docs) {
   		var productChunks = [];
   		var chunkSize = 15;
   		for(var i = 0; i < docs.length ; i += chunkSize){
   			productChunks.push(docs.slice(i,i + chunkSize))
   		}
  		res.render('noticias/index',{products: productChunks});
   });
})

router.get('/noticias/:id', (req,res, next) => {
	var noticiaUnica = req.params.id;
	noticia.findById(noticiaUnica,(err, not) => {
		if(err){
			return res.redirect('/');

		}
		var titulo = not.titulo;
		var link = not.link;
		var descripcion = not.descripcion;
		res.render('noticias/comentarios',{titulo: titulo, link: link, descripcion: descripcion});
	})
})

router.get('/noticia',(req, res, next)=> {
  return res.render('noticias/post');
});


router.post('/noticia',(req,res, next) =>{
	const {
		titulo,
		descripcion,
		link,
    categoria

	} = req.body;


	var not = new noticia({
		titulo,
		descripcion,
		link,
		dia: new Date(),
		votos: 0,
    categoria
	});
	not.save((req, res, err) =>{
		if(err) return handleError(err);
	})
	res.redirect('noticias/index');

});

router.put('/noticia/:id',(req, res, next) =>{
	res.send('/noticia/:id')
	noticia.findByIdAndUpdate({_id:req.params.id},{
		votos: req.body.votos + 1
	});
});

router.get('/vote_up/:id', (req, res) => {
	var id = req.params.id;
	noticia.findById(id,(err, task)=>{
		task.votos += 1;
		task.save().
			then (() => res.redirect('/'));
	})

})

router.get('/vote_down/:id', (req, res)=>{
	var id = req.params.id;
	noticia.findById(id,(err, task) =>{
		task.votos -= 1;
		task.save().
			then(()=> res.redirect('/'))
	})
})

router.get('/eliminar/:id', (req, res) => {
	var id = req.params.id;
	noticia.remove({_id:id},(err, task)=>{
		if(err) return next(err);
		res.redirect('/');
	})
});

router.get('/mostrar',(req,res,next) =>{
  noticia.find({categoria:'mostrar'} , function(err, docs) {
   		var productChunks = [];
   		var chunkSize = 15;
   		for(var i = 0; i < docs.length ; i += chunkSize){
   			productChunks.push(docs.slice(i,i + chunkSize))
   		}
  		res.render('noticias/index',{products: productChunks});
   });
})

router.get('/pregunta',(req,res, next) => {
  noticia.find({categoria:'pregunta'}).sort({votos:-1}).exec( (err, docs) => {
    var productChunks = [];
    var chunkSize = 15;
    for(var i = 0; i < docs.length ; i += chunkSize){
      productChunks.push(docs.slice(i,i + chunkSize))
    }
    res.render('noticias/index',{products: productChunks});
  })
})

module.exports = router;
