import receiptsRepository from "../repositories/receipts.repository";
import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";

class ReceiptsService {
    addReceipt(receiptData: string): string {
        throw new HttpError(`Not implemented`, 501);
        // return randomUUID()
        // receiptsRepository.addReceipt(receiptData)
    }

    getPoints(id: string) {
        throw new HttpError(`Not implemented`, 501);
        // return 32
    }
}


export default new ReceiptsService()