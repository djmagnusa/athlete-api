const express = require('express');
require("../src/db/conn");

const MensRanking = require("../src/models/mens")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.get('/', async (req, res) => {
//     res.send("testing");
// })

app.post("/mens", async(req, res) => {
    try{
        const addingMensRecord = new MensRanking(req.body)
        console.log(req.body);
        const insertMens = await addingMensRecord.save();
        res.status(201).send(insertMens);
    } catch(e) {
        res.status(400).send(e);
    }
})

app.get("/mens", async (req, res) => {
    try{
        const getMens = await MensRanking.find({});
        res.send(getMens)
    }catch(e){
        res.status(400).send(e)
    }
})

//handle get req for individual
app.get("/mens/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findById({_id: _id})
        res.send(getMen);
    }catch(e){
        res.status(400).send(e);
    }
})
//handle patch request of individual
app.patch("/mens/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate(_id,req.body, {
            new: true
        }); //new: true to get the updated data
        res.send(getMen);
    }catch(e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`Connection is live at port no. ${port}`);
})

