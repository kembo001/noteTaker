const fs = require('fs');
const path = require('path');
const routes = require('express').Router();

module.exports = routes => {
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);
        routes.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        routes.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        routes.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        routes.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        routes.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        routes.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}

