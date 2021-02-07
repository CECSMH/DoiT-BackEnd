const NodeCache = require ('node-cache') ;     
const Cache = new NodeCache ( { stdTTL: 100, checkperiod: 120 } ) ;

class Syncronization {

    async computer(requisition, response){

        const test = Cache.get(requisition.params.id)

        if(!test) {
            Cache.set(requisition.params.id, {"mac":"not_yet"}, 60)
            return response.status(200).json({"se entrou aqui": "é por que foi a primeira vez"})
        }else{
            return response.status(200).json(Cache.get(requisition.params.id))
        }
    }

    async cell(requisition, response){
        const mac = requisition.params.mac;
        Cache.set(requisition.params.id, {"mac": mac}, 60)
        return response.status(200).json(Cache.get(requisition.params.id))
    }

}

module.exports = new Syncronization;