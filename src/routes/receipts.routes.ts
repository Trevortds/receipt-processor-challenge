import { Router } from "express";
import controller from "../controllers/receipts.controller";
import { createValidator } from 'express-joi-validation'
import {getPointsValidator, processReceiptValidator} from "../validators/receipts.validators";

export const receiptsRoutes = Router();
const validator = createValidator()

// If we needed some access control, it would get declared here as middleware
receiptsRoutes.post("/", validator.body(processReceiptValidator), controller.processReceipt);
receiptsRoutes.get("/:id/points", validator.params(getPointsValidator), controller.getPoints);