const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(dbJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/notes', (req, res) => {
  try {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newData = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newData);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/notes/:id', (req, res) => {
  try {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => note.id !== req.params.id);
    fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
    res.json('Note deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;