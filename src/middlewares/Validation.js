const Model = require('../model/Model');//importing model script.
const { isPast } = require('date-fns');//importing date lib.



const Validation = async (requisition, response, next) => {

    const { mac, type, title, description, when} = requisition.body;

/* ############ Simple logic to verify if required fields is filled ########### */
    if(!mac){
        return response.status(400).json({ error: 'Endereço mac é obrigatorio!'})
    }else if(!type){
        return response.status(400).json({ error: 'O tipo é obrigatorio!'})
    }else if(!title){
        return response.status(400).json({ error: 'O titulo é obrigatorio!'})
    }else if(!description){
        return response.status(400).json({ error: 'A descrição é obrigatoria!'})
    }else if(!when){
        return response.status(400).json({ error: 'A Data e Hora são obrigatorias!'})
    }else if(isPast(new Date(when))){
        return response.status(400).json({ error: 'Escolha uma data no futuro!'})
    }else{
    
    /* ####### Checking if there are two tasks for the same time or in the past ################ */
        let exists;

        if(requisition.params.id){
            exists = await Model.findOne({'_id':{'&ne': requisition.params.id},'when': {'$eq':new Date(when)}, 'mac': {'$in': mac}});
        }else{
            exists = await Model.findOne({'when': {'$eq':new Date(when)}, 'mac': {'$in': mac}});
        }

       
        if(exists){
            return response.status(400).json({ error: 'Já existe uma tarefa marcada para esse dia e horario!'})
        }

        next();
    }

}

module.exports = Validation;