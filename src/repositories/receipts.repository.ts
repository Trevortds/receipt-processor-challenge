

/*
This is a subsitute for some kind of persistent storage backend.
IRL this would probably be handled with a database through an ORM or something like that.
 */

class ReceiptsRepository {
    storedReceipts: Array<string> = []
    addReceipt(receipt: string) {
        this.storedReceipts.push(receipt);
    }
}


/*
 Note: this is quick & dirty, if this got imported to more than one other file, the storage wouldn't persist.
 If for some reason you wanted to do that, you'd want to make this a proper singleton
 or more idiomatically typescript, a namespace
 */
export default new ReceiptsRepository()