
const { AbilityBuilder, Ability } = require('@casl/ability');
const rolesAccess = {
  Common: [{
    action: "manage",
    subject: "Common"
  }],
  ADMIN: [
    {
      action: "manage",
      subject: "all"
    }
  ],
  Dev: [
    {
      action: ['read', 'write', 'update', 'remove'],
      subject: ['Timesheet']
    },
    {
      action: ['read'],
      subject: ['Projects']
    },
    {
      action: ['read','write'],
      subject: ['Comments']
    }
  ],
  TeamLead: [
    {
      action: ['read', 'write', 'update', 'remove'],
      subject: ['Timesheet']
    },
    {
      action: 'read',
      subject: ['Reports', 'Projects']
    },
     {
      action: ['read','write'],
      subject: ['Comments']
    }
  ]
}
function defineAbilitiesFor (role) {
  const { rules, can } = new AbilityBuilder();
  const roles = ['Common'];
  if(role) {
    roles.push(role);
  }
  roles.forEach(currentRole => {
    const permissions = rolesAccess[currentRole];
    if(permissions && permissions.length) {
      permissions.forEach(permission => {
        can(permission.action, permission.subject);
      })
    }
  })
  return new Ability(rules)
}
const getActionFromMethod = (method) => {
  switch(method) {
    case 'GET': return 'read';
    case 'PUT': return 'update';
    case 'POST': return 'write';
    case 'DELETE': return 'remove';
    default: return 'manage';
  }
}
const getSubjectFromPath = (path) => {
  let startsWith = (startsVal) => path && path.startsWith(startsVal)
  switch(true) {
    case startsWith('/users'):
    case startsWith('/roles'):
      return 'Users';
    case startsWith('/tasks'):
      return 'Timesheet';
    case startsWith('/comments'):
      return 'Comments';
    case startsWith('/projects'):
    return 'Projects';
    default: return 'Common';
  }
}
module.exports = (req, res, next) => {
  const ability = defineAbilitiesFor(req.user && req.user.role);
  const action = getActionFromMethod(req.method);
  const subject = getSubjectFromPath(req.path);
  const canAccess = ability.can(action, subject);
  if (canAccess) {
    return next()
  } else {
    return res.status(403).json({
      message: `You are not authorized to ${action}`
    })
  }
}
