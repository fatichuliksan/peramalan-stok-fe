import buyingPrice from "./master/buyingPrice";
import purchaseDiscount from "./master/purchaseDiscount";
import skuView from "./master/skuView";
export default {
    namespaced: true,
    modules: {
        buyingPrice: buyingPrice,        
        purchaseDiscount: purchaseDiscount,        
        skuView: skuView,        
    }
}
