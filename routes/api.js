const router = require('express').Router();
const {createEnvelop, getEnvelope, getEnvelopeById, 
    updateEnvelopeById, deleteEnvelopeById, transfer} = require('../controllers/envelops');


/**
 * @swagger
 * /api/v2/:
 *   get:
 *     summary: Get all envelopes
 *     tags:
 *       - Envelopes
 *     description: Returns all envelops
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of envelops
 */

router.get('', getEnvelope);

/**
 * @swagger
 *  /api/v2/{id}:
 *    get:
 *      summary: Get an envelope by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404": 
 *          description: Envelope Not Found
 *        "500":
 *          description: Internal server error or Not found
 */

router.get('/:id', getEnvelopeById);



/**
 * @swagger
 * /api/v2/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                - budget
 *              properties:
 *                budget:
 *                  type: integer
 *              example:
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404": 
 *          description: Envelope Not Found
 *        "500":
 *          descriptiosn: Internal server error
 */

router.put('/:id', updateEnvelopeById);

/**
 * @swagger
 * /api/v2/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 */

router.delete('/:id', deleteEnvelopeById);

/**
 * @swagger
 * /api/v2/:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                required: 
 *                  - title
 *                  - budget
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created message
 *        "500":
 *          description: Internal server error
 */

router.post('', createEnvelop);

/**
 * @swagger
 *  /api/v2/transfer:
 *    post:
 *      summary: Creates a new envelope transaction
 *      consumes:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new transaction
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                 - from
 *                 - to 
 *                 - budget
 *              properties:
 *                from:
 *                  type: integer
 *                to: 
 *                  type: integer
 *                budget:
 *                  type: integer
 *      responses:
 *        "200":
 *          description: Transfer success
 *        "500":
 *          description: Internal server error
 */
router.post('/transfer', transfer);

module.exports = router;
