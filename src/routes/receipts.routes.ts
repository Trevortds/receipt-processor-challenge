import { Router } from "express";
import controller from "../controllers/receipts.controller";

export const receiptsRoutes = Router();

// If we needed some access control, it would get declared here as middleware
receiptsRoutes.post("/", controller.processReceipt);
receiptsRoutes.get("/:id/points", controller.getPoints);