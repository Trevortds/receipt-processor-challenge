

/*
This is a subsitute for some kind of persistent storage backend.
IRL this would probably be handled with a database through an ORM or something like that.
 */

import {Receipt} from "../models/Receipt";

class ReceiptsRepository {
    storedReceipts: Map<string, Receipt> = new Map<string, Receipt>()
    addReceipt(id: string, receipt: Receipt) {
        this.storedReceipts.set(id, receipt);
    }

    getReceipt(id: string): Receipt | undefined {
        return this.storedReceipts.get(id);
    }
}


/*
 Note: this is quick & dirty, if this got imported to more than one other file, the storage wouldn't persist.
 If for some reason you wanted to do that, you'd want to make this a proper singleton
 or more idiomatically typescript, a namespace
 */
export default new ReceiptsRepository()