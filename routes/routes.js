const { Router } = require('express');
const { User, Appointment } = require('../models/appointment');
const router = Router();

function checkLogin(req, res, next) {
  if (req.session.user == null){
    res.redirect('login');
  }
  res.locals.user = req.session.user;
  next();
}

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/addNewAppo', checkLogin, async (req, res) => {
  if(req.body.date==''||req.body.time==''||req.body.complain==''){
    return res.send('fail');
  }
  const appo = await Appointment.create({
    date: req.body.date,
    time: req.body.time,
    complain: req.body.complain,
    UserId: req.session.user.id 
  });
  res.redirect('/');
});


router.get('/new_Appointments', checkLogin, (req, res) => {
  res.render('newAppointments');
});

router.get('/', checkLogin, async (req, res) => {
  const user = await User.findAll(
    {include: [Appointment]}
  );
  const appo = await Appointment.findAll(
    {include: [User]}
  );
  res.render('mainPage', {user, appo});
});

router.get('/:id', (req,res)=>{
  const id = req.params.id;
  if(id != undefined){
    res.render('error')
  }
});

router.get('/error',(req, res) => {
  res.render('error');
});

module.exports = router;