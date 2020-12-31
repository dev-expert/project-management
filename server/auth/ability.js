
const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor (role) {
  const { rules, can } = new AbilityBuilder();
  switch(role) {
    case 'ADMIN':
    case 'MANAGER':
      can(['read', 'write', 'update', 'delete'], ['users', 'projects', 'tasks'])
    break;
    case 'EMPOLOYEE':
    case 'CLIENT':
      can(['read', 'write', 'update', 'delete'], ['tasks'])
      can(['read'], ['projects', 'users'])
    break;
    default:
      break;
  }
  return new Ability(rules)
}
module.exports = (req, res, next) => {
  if (req.user && req.user.role) {
    req.user.ability = defineAbilitiesFor(req.user.role)
  }
  next()
}
