const express = require('express'); //importing express module.
const router = express.Router(); //using the express router module.

const taskController = require('../controller/Controller'); //importing Controller script
const Validation = require('../middlewares/Validation'); //importing Validation script
const Syncronization = require('../controller/sync');


router.post('/', Validation, taskController.create);//task creation route.

router.put('/:id/:status', taskController.doneToggle);//toggles task status route.
router.put('/:id', Validation, taskController.update);//task update route.
router.get('/:id', taskController.fetchOne);//Fetch one task route.
router.delete('/:id', taskController.delete);//Delete route.


/* ############# Task filters routes ################## */
router.get('/filter/all/:mac', taskController.fetchAll);
router.get('/filter/late/:mac', taskController.lateFilter);
router.get('/filter/today/:mac', taskController.todayFilter);
router.get('/filter/week/:mac', taskController.weekFilter);
router.get('/filter/month/:mac', taskController.monthFilter);
router.get('/filter/year/:mac', taskController.yearFilter);
router.get('/filter/done/:mac', taskController.doneFilter);
/* #################################################### */


router.get('/sync/pc/:id', Syncronization.computer)
router.get('/sync/cell/:mac/:id', Syncronization.cell)


module.exports = router; 