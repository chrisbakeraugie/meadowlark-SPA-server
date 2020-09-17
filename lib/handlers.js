const db = require('../db');

exports.getVacationApi = async (req,res) => {
  const vacations = await db.getVacations({ available: true });
  console.log(typeof vacations);
  res.json(vacations);
};

exports.getVacationBySkuAPI = async (req, res) => {
  const vacation = await db.getVacationBySku(req.params.sku);
  res.json(vacation);
}

exports.addVacationInSeasonListenerAPI = async (req, res) => {
  console.log(`${req.body.email} is listening for vacation ${req.params.sku}`);
  await db.addVacationInSeasonListener(req.body.email, req.params.sku);
  res.json({ message: 'successful' });
}

exports.requestDeleteVacationAPI = async (req, res) => {
  const { email, notes } = req.body;
  res.status(500).json({ message: 'not yet implemented'});
}
