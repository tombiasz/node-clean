const knexConnectionFactory = require('knex');
const ContactsRepository = require('./ContactsRepository');
const EmailsRepository = require('./EmailsRepository');
const mapContactDataToEntity = require('./mappers/mapContactDataToEntity');
const mapEmailDataToEntity = require('./mappers/mapEmailDataToEntity');

const makeKnex = config => knexConnectionFactory({
  client: config.dbClient,
  connection: {
    filename: config.dbFilename,
  },
  debug: config.dbLogging,
  useNullAsDefault: true,
});

const makeRepositories = knex => Object.freeze({
  contactsRepository: new ContactsRepository({ knex, mapContactDataToEntity }),
  emailsRepository: new EmailsRepository({ knex, mapEmailDataToEntity }),
});

module.exports = config => makeRepositories(makeKnex(config));
