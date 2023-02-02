import IInventory from "./IInventory";

interface IAddInventory extends IInventory {
    quantity?: number;
}

export default IAddInventory;