/*
 https://dev.to/thormeier/fully-responsive-html-css-sticky-note-4okl
https://codepen.io/JoshuaDraxten/pen/AaQvWr

Attenzione creare un front end di post it come desiderate con tecnologia bs5 

*/
const express = require('express') //modulo che fornisce la base per la creazione dell'applicazione web utilizzando il framework Express.

const fs = require('fs')// modulo che fornisce le funzionalità per accedere al file system del server.

const path = require('path')//modulo che fornisce le funzionalità per la gestione dei percorsi di file e directory.

const ejs = require('ejs')//modulo che fornisce il supporto per il motore di template EJS che permette di generare HTML dinamicamente.

const bodyParser = require('body-parser')//per gestire le richieste HTTP POST e di conseguenza i dati del corpo della richiesta.

let ourLibrary=require('./functions.js');// importa il modulo functions.js dal file system del server utilizzando il path relativo ./functions.js e lo assegna alla variabile ourLibrary.
let data = require('./data/person.json');
let app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:true}));// bodyParser per analizzare il corpo delle richieste HTTP POST
//.{extended:true} consente di utilizzare JSON e dati  nel corpo della richiesta.

app.get('/', (req, res) => {//La prima richiesta GET viene gestita dalla funzione callback che rende la vista home.
  res.render('home')
})

app.get('/postit', (req, res) => {//e un gestore di richieste POST Successivamente,  La seconda richiesta GET rende la vista postit, legge i dati dal file person.json, e li passa alla vista come oggetto JSON.
  var data1;
  data1 = fs.readFileSync("./data/person.json", "utf8", (err, dati) => {//legge il contenuto del file person.json utilizzando il metodo readFileSync del modulo fs. Il primo parametro passato al metodo readFileSync è il percorso del file da leggere, in questo caso ./data/person.json.
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  res.render('postit', {data: JSON.parse(data1)})
})

app.get('/json',function(req,res){
  res.sendFile(__dirname+"/data/person.json")
})//La terza richiesta GET viene gestita dalla funzione callback che rende il file person.json.

app.post('/scrivi',function(req,res){//Infine, il gestore di richieste POST prende i dati inviati dal form, li aggiunge al file person.json e, dopo l'aggiunta, reindirizza l'utente alla vista postit.
  let dati = "["
  let size = Object.keys(data).length;// La funzione Object.keys() restituisce un array contenente le chiavi dell'oggetto passato come argomento.

  let datoJSON = JSON.parse(fs.readFileSync("./data/person.json", "utf8", function(err) {
    if (err) {
      console.log("")
    }
  }))

  let person = {
    Nickname:req.body.Nickname,
    Post:req.body.Post
  }
  datoJSON.push(person);
  console.log(datoJSON);

  fs.writeFile('./data/person.json', JSON.stringify(datoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log('i dati li ho scritti nel file person.json');

  })
  res.redirect('/postit')
});

app.listen(8080);//Infine, l'applicazione avvia il server web in ascolto sulla porta 8080.
