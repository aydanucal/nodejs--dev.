const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/nodejs_odev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Veritabanına bağlandı!")).catch(err => console.log(err));

const NoteSchema = new mongoose.Schema({ title: String });
const Note = mongoose.model('Note', NoteSchema);

app.get('/', async (req, res) => {
    const notes = await Note.find();
    res.render('index', { notes });
});

app.get('/add', async (req, res) => {
    res.render('add');
});
app.post('/add', async (req, res) => {
    await Note.create({ title: req.body.title });
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('edit', { note });
});
app.post('/edit/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, { title: req.body.title });
    res.redirect('/');
});

app.listen(3000, () => console.log('Sunucu 3000 portunda çalışıyor...'));
