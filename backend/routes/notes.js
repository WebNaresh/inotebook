const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

const router = require('express').Router();

// route:1 get all the Note ""
router.get('/fetchallnote', fetchuser, async (req, res) => {
  try {


    const note = await Note.find({ user: req.user.id })
    res.json(note)
  } catch (error) {
    // Route 1 catching errors
    console.log(error);
    res.status(500).send("server is under maintainencs")
  }

})




// route:2 create all the Note Using post "/api/auth/addnote"
router.post('/addnote', fetchuser, [
  body('title', "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be at least 5 Characters").isLength({ min: 5 }),
], async (req, res) => {

  try {


    const { title, description, tag } = req.body;

    // Route 1 If ther are errors return bad request and err
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Route 1 express validator error detection we not used that 
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    // Route 2 catching errors
    console.log(error);
    res.status(500).send("server is under maintainencs")
  }


})

// Route 3 : Update an existing Note using : put "/api/notes/updatenote" Login requireed

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote Object
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    // Find th note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note Found")
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("note Allowed")

    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })

  } catch (error) {
    console.log(error);
    res.status(500).send("server is under maintainencs")
  }

})

// Rote 4 : to delete and note using : Delete "/api/notes/deletenote" login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {



    try {
      const { title, description, tag } = req.body;
      // Create a newNote Object
     
      // Find th note to be delete and delelete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send("Note Found")
      }
      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("note Allowed")
  
      }
      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "success":"Note has been deleted" ,note})
  
    } catch (error) {
      console.log(error);
      res.status(500).send("server is under maintainencs")
    }
  
})

module.exports = router;