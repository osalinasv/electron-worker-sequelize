if (typeof window != 'object') {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  self.window = self
  global.window = self
}

import { Sequelize, DataTypes } from 'sequelize'
import registerPromiseWorker from 'promise-worker'

let _initialized = false
const sequelize = new Sequelize(null, null, 'password', {
  dialect: 'sqlite',
  dialectModulePath: '@journeyapps/sqlcipher',
  storage: './database.db',
})

const Record = sequelize.define('Record', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

async function saveRecord(text) {
  const record = await Record.create({ text })
  return record.id
}

async function getRecord(id) {
  return await Record.findOne({ id })
}

registerPromiseWorker(async (message) => {
  if (!_initialized) {
    await sequelize.sync({ force: true })
    _initialized = true
  }

  switch (message.type) {
    case 'post':
      return await saveRecord(message.text)
    case 'get':
      return await getRecord(message.id)
    default:
      break
  }
})
