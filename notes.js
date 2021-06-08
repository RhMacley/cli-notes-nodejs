const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (duplicateNote) return console.log(chalk.red.inverse("Note alreadys exists"))
    
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteFiltered = notes.findIndex(note => note.title === title)

    if (noteFiltered === -1) return console.log(chalk.red.inverse('No note found!'))
    
    notes.splice( noteFiltered, 1)
    saveNotes(notes)  
    console.log(chalk.green.inverse('Note removed!'))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFiltered = notes.find(note => note.title === title)

    if (!noteFiltered) return console.log(chalk.red.inverse('Note not found!'))
    
    console.log(chalk.inverse(noteFiltered.title))
    console.log((noteFiltered.body))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes:'))
    notes.forEach(note => console.log(chalk.blue.inverse(`title: ${note.title}`)))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const data = fs.readFileSync('notes.json').toString()
        return JSON.parse(data)
    } catch (e) {
        return console.log("Error in load of your file");
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}