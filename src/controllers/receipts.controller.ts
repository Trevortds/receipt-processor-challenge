import {Request, Response} from "express";
import logger from "../config/logger"
import receiptsService from "../services/receipts.service"
import {HttpError} from "../util/HttpError";

class ReceiptsController {
    /*
    Endpoint: Process Receipts

    Path: /receipts/process
    Method: POST
    Payload: Receipt JSON
    Response: JSON containing an id for the receipt.

Description:

Takes in a JSON receipt (see example in the example directory) and returns a JSON object with an ID generated by your code.

The ID returned is the ID that should be passed into /receipts/{id}/points to get the number of points the receipt was awarded.

How many points should be earned are defined by the rules below.

Reminder: Data does not need to survive an application restart. This is to allow you to use in-memory solutions to track any data generated by this endpoint.

Example Response:

{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
     */
    processReceipt(req: Request, res: Response){
        const receiptData = req.body
        const id = receiptsService.addReceipt(receiptData)
        res.status(201).send({ "id": id })
    }


    /*
    Endpoint: Get Points

    Path: /receipts/{id}/points
    Method: GET
    Response: A JSON object containing the number of points awarded.

A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.

Example Response:

{ "points": 32 }
     */
    getPoints(req:Request, res: Response) {
        const id = req.params.id
        const points = receiptsService.getPoints(id)

        res.status(200).send({ "points": points })

        // res.status(200).send({ "points": 32 })
        // res.status(200).send(`receipt ${req.params.id} is worth infinity points`)
    }
}

export default new ReceiptsController();