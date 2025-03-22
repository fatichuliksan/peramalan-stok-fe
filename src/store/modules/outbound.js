

import simpleSto from "./outbound/simpleSto";
import simpleStoDo from "./outbound/simpleStoDo";
import supplierReturn from "./outbound/supplierReturn";
import processing from "./outbound/processing";
export default {
    namespaced: true,
    modules: {
        simpleSto: simpleSto,
        simpleStoDo: simpleStoDo,
        supplierReturn: supplierReturn,
        processing: processing,
    }
}
