const Model = require('../model/Model');
const currentDate = new Date();
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear ,endOfYear } = require('date-fns');


class taskController {

    // ######### Creation method ###########
    async create(requisition, response){
        const task = new Model(requisition.body);
        await task.save().then(resp => {
            return response.status(200).json(resp);})
        .catch(error => {response.status(500).json(error);});
    }
    // ######### Update method ###########
    async update(requisition, response){
        await Model.findByIdAndUpdate({'_id': requisition.params.id}, requisition.body, {new: true}).then(resp => {
            return response.status(200).json(resp);
        }).catch(error => {
            return response.status(500).json(error);
        })
    }
    // ######## Fetch all task from db ####
    async fetchAll(requisition, response){
       await Model.find({mac:{'$in': requisition.params.mac}}).sort('when').then(resp => {
           return response.status(200).json(resp);
       }).catch(error =>{ return response.status(500).json(error)});
    }
    // ######## Fetch one task using id ####
    async fetchOne(requisition, response){
        await Model.findById(requisition.params.id).then(resp => {
            if(resp){
                return response.status(200).json(resp);
            }else{
                return response.status(404).json({error: 'Tarefa não encontrada'});
            }
        }).catch(error =>{ return response.status(500).json(error)});
    }
    // ######## delete one task using id ###
    async delete(requisition, response){
        await Model.deleteOne({"_id": requisition.params.id}).then(resp =>{
            return response.status(200).json(resp);
        }).catch(error => {return response.status(500).json(error);});
    }
    // ########## toggle status of the task(done/pending)#####
    async doneToggle(requisition, response){
        await Model.findByIdAndUpdate({"_id": requisition.params.id},{"complete": requisition.params.status}, {new : true}).then(resp =>{
            return response.status(200).json(resp);
        }).catch(error => {return response.status(500).json(error);});
    }
    // ########## Fetch late tasks #######
    async lateFilter(requisition, response){
        await Model.find({'when':{'$lt': currentDate}, 'mac':{'$in': requisition.params.mac}}).sort('when').then(resp =>{
            return response.status(200).json(resp);
        }).catch(error => {return response.status(500).json(error);});
    }
    // ######### Fecth today tasks #######
    async todayFilter(requisition, response){
        await Model.find({'mac':{'$in': requisition.params.mac}, 'when': {'$gte': startOfDay(currentDate), '$lt': endOfDay(currentDate)}})
        .sort('when').then(resp => { 
            return response.status(200).json(resp)})
        .catch(error => {return response.status(500).json(error);});
    }
    // ########## Fetch week tasks ########
    async weekFilter(requisition, response){
        await Model.find({'mac':{'$in': requisition.params.mac}, 'when': {'$gte': startOfWeek(currentDate), '$lt': endOfWeek(currentDate)}})
        .sort('when').then(resp => { 
            return response.status(200).json(resp)})
        .catch(error => {return response.status(500).json(error);});
    }
    // ######### Fetch month tasks #########
    async monthFilter(requisition, response){
        await Model.find({'mac':{'$in': requisition.params.mac}, 'when': {'$gte': startOfMonth(currentDate), '$lt': endOfMonth(currentDate)}})
        .sort('when').then(resp => { 
            return response.status(200).json(resp)})
        .catch(error => {return response.status(500).json(error);});
    }
    // ########## Fecth year tasks ##########
    async yearFilter(requisition, response){
        await Model.find({'mac':{'$in': requisition.params.mac}, 'when': {'$gte': startOfYear(currentDate), '$lt': endOfYear(currentDate)}})
        .sort('when').then(resp => { 
            return response.status(200).json(resp)})
        .catch(error => {return response.status(500).json(error);});
    }
    // ########## Fecth completed tasks #######
    async doneFilter(requisition, response){
        await Model.find({'mac':{'$in': requisition.params.mac}, 'complete': true}).sort('when')
        .then(resp => {
            return response.status(200).json(resp);
        }).catch(error => {
            return response.status(500).json(error);
        });
    }


}

module.exports = new taskController();