const router = require('express').Router();
const {createEnvelop, getEnvelope, getEnvelopeById, 
    updateEnvelopeById, deleteEnvelopeById, transfer} = require('../controllers/envelops');

router.get('', getEnvelope);
// router.get('/:id', getEnvelopeById);
// router.put('/:id', updateEnvelopeById);
// router.delete('/:id', deleteEnvelopeById);
router.post('', createEnvelop);
// router.post('/transfer', transfer);

module.exports = router;
