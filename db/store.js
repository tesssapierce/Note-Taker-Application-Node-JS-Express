const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuidv1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read(){
    return readFileAsync("db/db.json", "utf8")
  }

  write(notes){
    return writeFileAsync("db/db.json", JSON.stringify(notes))
  }

  getNotes(){
    return this.read().then((res) => {
      let currentNotes;
      try {
        currentNotes = [].concat(JSON.parse(res))
      } catch (err) {
        currentNotes = []
      }
      return currentNotes
    })
  }

  addNote(note){
    const { title, text } = note;
    const newNote = { title, text, id: uuidv1()};
    return this.getNotes()
    .then((response) => {
      return [...response, newNote];
    })
    .then((updatedNotes) => {
      return this.write(updatedNotes);
    })
    .then(() => {
      return newNote;
    });
  }

  removeNote(id){
    return this.getNotes()
      .then((remove) => remove.filter((deletedNote) => deletedNote.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();