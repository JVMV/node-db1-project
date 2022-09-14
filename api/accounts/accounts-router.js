const router = require('express').Router()
const Accounts = require('./accounts-model')

const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res) => {
  // DO YOUR MAGIC
  const reqAccount = await Accounts.getAll()
  res.status(200).json(reqAccount)
})

router.get('/:id', checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res) => {
  // DO YOUR MAGIC

})

router.put('/:id', (req, res) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
