import simpleSto from "./inbound/simpleSto";
import purchaseOrder from "./inbound/receive/purchase-order";
import customerReturn from "./inbound/receive/customer-return";
import interWarehouse from "./inbound/receive/inter-warehouse";
import podReturn from "./inbound/receive/pod-return";
export default {
    namespaced: true,
    modules: {
        simpleSto: simpleSto,
        purchaseOrder:purchaseOrder,
        customerReturn:customerReturn,
        interWarehouse:interWarehouse,
        podReturn:podReturn,
    }
}
