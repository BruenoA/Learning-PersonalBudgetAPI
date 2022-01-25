const { pool } = require('../db/index')

module.exports.createEnvelop = async (req, res) => {
    const {title, budget} = req.body;
    
    try {
    const result = await pool.query('INSERT INTO Envelop (title, budget) VALUES ($1, $2)',
        [title, budget])

    res.status(201).json({message: 'Created'});

    }
    catch (err) {
        res.status(500).json({message: err});
    }
    
}

module.exports.getEnvelope = async (req, res) => {
    try{
        const envelops = await pool.query('SELECT * FROM Envelop');
        res.status(200).json({envelops: envelops.rows});
    } 
    catch (err) {
        res.status(500).json({message: err.detail});
    }
    
}

module.exports.getEnvelopeById = async (req, res) => {
    try{
        const envelops = await pool.query('SELECT * FROM Envelop WHERE id = $1', [req.params.id]);
        if (envelops.rows.length === 0) {
            res.status(404).json({message: 'Envelop not found'})
        } else 
            res.status(200).json({envelops: envelops.rows});
    } 
    catch (err) {
        res.status(500).json({message: err});
    }
}

module.exports.updateEnvelopeById = async (req, res) => {
    try{        
        const envelops = await pool.query('SELECT * FROM Envelop WHERE id = $1', [req.params.id]);
        if (envelops.rows.length === 0) {
            res.status(404).json({message: 'Envelop not found'})
        } else {
            const update = await pool.query('UPDATE Envelop SET budget=$2 WHERE id = $1', [req.params.id, req.body.budget]);
            res.status(201).json({envelops: envelops.rows});
        }
    } 
    catch (err) {
        res.status(500).json({message: err});
    }
}

module.exports.deleteEnvelopeById = async (req, res) => {
    try{
        const envelops = await pool.query('DELETE FROM Envelop WHERE id = $1', [req.params.id]);
        res.status(204).json({message: 'Deleted'});
    } 
    catch (err) {
        res.status(500).json({message: err});
    }
}

module.exports.transfer = async (req, res) => {
    const {from, to, budget} = req.body;
    try{
        const envl1 = await pool.query('SELECT * FROM Envelop WHERE id = $1', [from]);
        const envl2 = await pool.query('SELECT * FROM Envelop WHERE id = $1', [to]);
        const amount_from = await pool.query('SELECT budget FROM Envelop WHERE id = $1', [from]);

        if (amount_from.rows[0] < budget)
            throw new Error('Not enough budget to transfer');

        if (envl1.rows.length !== 1 || envl2.rows.length !== 1)
            throw new Error('Not exist envelop')

        const transfer = await pool.query('CALL Transfer($1, $2, $3)', [from, to, budget]);
        
        res.status(200).json({message: 'Success'});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
}

