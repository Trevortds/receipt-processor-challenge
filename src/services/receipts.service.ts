import receiptsRepository from "../repositories/receipts.repository";
import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";
import {activePointsRules} from "../util/PointsRules";
import {Receipt} from "../models/Receipt";

class ReceiptsService {
    addReceipt(receiptData: Receipt): string {
        const newId = randomUUID()
        receiptsRepository.addReceipt(newId, receiptData)
        return newId
    }

    getPoints(id: string) {
        const receipt = receiptsRepository.getReceipt(id)
        if (!receipt) {
            throw new HttpError(`Receipt ${id} not found`, 404)
        }
        return activePointsRules.reduce((total, rule) => total + rule(receipt), 0)
    }
}


export default new ReceiptsService()