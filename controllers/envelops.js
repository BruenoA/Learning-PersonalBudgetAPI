const { pool } = require('../db/index')

module.exports.createEnvelop = async (req, res) => {
    const {title, budget} = req.body;
    
    try{
        const created 
            = await pool.query('INSERT INTO Envelop (title, budget) VALUES ($1, $2)',
            [title, budget]);
        console.log(created);
        return res.status(201).send(JSON.stringify(created.rows));

    } catch(err){
        console.log("Error:", err);
    }
    res.status(409).send(JSON({message: 'Failed to create envelop'}));
}

module.exports.getEnvelope = async (req, res) => {
    res.status(200).send(JSON({message: 'Hello'}));
}

// module.exports.getEnvelopeById = async (req, res) => {
//     const envelop = await getEnvelopeById(req.params.id);
//     if (envelop){
//         res.status(200).send(envelop);
//     }
//     else{
//         res.status(404).send({message: `Envelop with id ${req.params.id} not found`});
//     }
// }

// module.exports.updateEnvelopeById = async (req, res) => {
//     const {title, budget} = req.body;
//     const envelop = await updateEnvelopeById(req.params.id, title, budget);
//     if (envelop)
//         res.status(201).send(envelop);
//     else
//         res.status(404).send({message: `Envelop with id ${req.params.id} not found`});
// }

// module.exports.deleteEnvelopeById = async (req, res) => {
//     const envelop = await deleteEnvelopeById(req.params.id);
//     if (envelop){
//         envelop.status = 'deleted';
//         res.status(204).send(envelop);
//     }
//     else{
//         res.status(404).send({message: `Envelop with id ${req.params.id} not found`});
//     }
// }

// module.exports.transfer = async (req, res) => {
//     const {from, to, budget} = req.body;
//     const status = await transfer(from, to, budget);
//     switch (status){
//         case -1:
//             res.status(404).send({message: `Envelop with id ${from} not found`});
//             break;
//         case -2:
//             res.status(404).send({message: `Envelop with id ${to} not found`});
//             break;
//         case 1:
//             res.status(400).send({message: `Envelop with id ${from} does not have enough budget to transfer ${budget}$`});
//             break;
//         default:
//             res.status(201).send({message: `Transfered ${budget}$ from id ${from} to id ${to}`});
//             break;
//     }
// }

