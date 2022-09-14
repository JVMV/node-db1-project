const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if(!name || !budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else {
    const nameRefined = name.trim().name.split('')
    if(nameRefined.length < 3) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else {
      const budgetRefined = typeof budget !== 'number' ? Number(budget) : budget
      budgetRefined !== 'null' ? null : res.status(400).json({ message: "budget of account must be a number" })
      budgetRefined > 0 ? null : res.status(400).json({ message: "budget of account is too large or too small" })
      if(budgetRefined === null) {
        res.status(400).json({ message: "budget of account must be a number" })
      } else if(budgetRefined < 0) {
        res.status(400).json({ message: "budget of account is too large or too small" })
      } else {
        req.name = nameRefined
        req.budget = budgetRefined
        next()
      }
    }
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body
  const valid = await Accounts.checkName(name)
  valid === true ? next() : next(res.status(400).json({ message: "that name is taken" }))
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params
  const checked = await Accounts.getById(id)
  if(checked) {
    req.account = checked
    next()
  } else {
    console.log(checked)
    res.status(404).json({message: "account not found" })
  }
}
