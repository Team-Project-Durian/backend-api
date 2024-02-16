/**
 * @openapi
 * /v1/durian:
 *   get:
 *     summary: get Durians
 *     tags:
 *       - Durian
 *     responses:
 *       200:
 *         description: get Durians
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 200
 *             error:
 *               type: boolean
 *               default: false
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   rfid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   longitude:
 *                     type: string
 *                   latitude:
 *                     type: string
 *                   grade:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   start:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *   post:
 *     summary: new Durian
 *     tags:
 *       - Durian
 *     parameters:
 *       - name: rfid
 *         in: body
 *         description: rfid
 *         required: true
 *         schema:
 *           type: string
 *       - name: owner
 *         in: body
 *         description: owner
 *         required: true
 *         schema:
 *           type: string
 *       - name: name
 *         in: body
 *         description: name
 *         schema:
 *           type: string
 *       - name: type
 *         in: body
 *         description: type
 *         schema:
 *           type: string
 *       - name: longitude
 *         in: body
 *         description: longitude
 *         schema:
 *           type: number
 *       - name: latitude
 *         in: body
 *         description: latitude
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: new Durian
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 201
 *             error:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: Created
 *   put:
 *     summary: update Durian
 *     tags:
 *       - Durian
 *     parameters:
 *       - name: rfid
 *         in: body
 *         description: rfid
 *         required: true
 *         schema:
 *           type: string
 *       - name: owner
 *         in: body
 *         description: owner
 *         schema:
 *           type: string
 *       - name: name
 *         in: body
 *         description: name
 *         schema:
 *           type: string
 *       - name: type
 *         in: body
 *         description: type
 *         schema:
 *           type: string
 *       - name: longitude
 *         in: body
 *         description: longitude
 *         schema:
 *           type: number
 *       - name: latitude
 *         in: body
 *         description: latitude
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: new Durian
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 200
 *             error:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: OK
 * /v1/durian?id={id}:
 *   get:
 *     summary: get Durian by id
 *     tags:
 *       - Durian
 *     responses:
 *       200:
 *         description: get Durians
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 200
 *             error:
 *               type: boolean
 *               default: false
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 rfid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 longitude:
 *                   type: string
 *                 latitude:
 *                   type: string
 *                 grade:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 start:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 * /v1/durian?owner={owner}:
 *   get:
 *     summary: get Durian by owner
 *     tags:
 *       - Durian
 *     responses:
 *       200:
 *         description: get Durians
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 200
 *             error:
 *               type: boolean
 *               default: false
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   rfid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   longitude:
 *                     type: string
 *                   latitude:
 *                     type: string
 *                   grade:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   start:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 * /v1/durian/grade:
 *   put:
 *     summary: update Durian
 *     tags:
 *       - Durian
 *     parameters:
 *       - name: rfid
 *         in: body
 *         description: rfid
 *         required: true
 *         schema:
 *           type: string
 *       - name: owner
 *         in: body
 *         description: owner
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: set Grade
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               default: 200
 *             error:
 *               type: boolean
 *               default: false
 *             message:
 *               type: string
 *               default: OK
 *
 */

import { Router } from "express";

import {
  getDurian,
  newDurian,
  updateDurian,
  setGradeDurian,
} from "../controllers/v1/durian.controller";

const router = Router();

router.get("/", getDurian);
router.post("/", newDurian);
router.put("/", updateDurian);
router.post("/grade", setGradeDurian);

export default router;
