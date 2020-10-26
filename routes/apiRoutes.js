const router = require("express").Router()
const store = require("../db/store")

router.get("/notes", (req, res) => {
  store.getNotes().then((notes) => res.json(notes))
})

router.post("/notes", (req, res) => {
  store.addNote(req.body).then((note) => res.json(note))
})

router.delete("/notes/:id", function(req,res){
  store.removeNote(req.params.id).then(() => res.json({ ok: true }))
})

module.exports = router;
