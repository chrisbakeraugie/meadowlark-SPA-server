const db = require('../db');

exports.getVacationApi = async (req,res) => {
  const vacations = await db.getVacations({ available: true });
  res.json(vacations);
};

exports.getVacationBySkuAPI = async (req, res) => {
  const vacation = await db.getVacationBySku(req.params.sku);
  res.json(vacation);
}

exports.addVacationInSeasonListenerAPI = async (req, res) => {
  console.log(`${req.body.email} is listening for vacation ${req.params.sku}`);
  await db.addVacationInSeasonListener(req.params.sku, req.body.email);
  res.json({ message: 'successful' });
}

exports.requestDeleteVacationAPI = async (req, res) => {
  const { email, notes } = req.body;
  res.status(500).json({ message: 'not yet implemented'});
}