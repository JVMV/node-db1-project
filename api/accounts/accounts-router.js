const router = require('express').Router()
const Accounts = require('./accounts-model')

const { 
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload 
} = require('./accounts-middleware')

router.get('/', async (req, res) => {
  // DO YOUR MAGIC
  const reqAccount = await Accounts.getAll()
  res.status(200).json(reqAccount)
})

router.get('/:id', checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res) => {
  // DO YOUR MAGIC
  const newAccount = await Accounts.create(req.newAccount)
  console.log(req.name, req.budget, 'ADDED SUCCESSFULLY with ID:', newAccount)
  res.status(201).json(req.newAccount)
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res) => {
  // DO YOUR MAGIC
  const updatedId = await Accounts.updateById(req.params.id, req.newAccount)
  const updatedAccount = await Accounts.getById(updatedId)
  res.status(200).json(updatedAccount)
});

router.delete('/:id', checkAccountId, async (req, res) => {
  // DO YOUR MAGIC
  const deletedAccount = await Accounts.deleteById(req.params.id)
  res.status(200).json(deletedAccount)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
