const db = require('../../data/db-config')

const getAll = async () => {
  const reqAccount = await db('accounts');
  return reqAccount
}

const getById = async id => {
  const [reqAccount] = await db('accounts').where('id', id)
  return reqAccount
}

const create = async account => {
  const createdAccount = await db('accounts').insert(account)
  return createdAccount
}

const updateById = (id, account) => {
  const updatedAccount = db('accounts').where('id', id).update(account)
  return updatedAccount
}

const deleteById = id => {
  const deletedAccount = db('accounts').where('id', id).del()
  return deletedAccount
}

const checkName = name => {
  const nameChecked = db('accounts').where('name', name)
  const decision = nameChecked ? true : false
  return decision
}

const checkId = async id => {
  const idChecked = await getById(id)
  return idChecked
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkName,
  checkId
}
