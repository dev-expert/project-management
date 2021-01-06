//ability.js
import { Ability, AbilityBuilder } from "@casl/ability";
import { decode } from 'jsonwebtoken'
const ability = new Ability([]);
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
  ],
  TeamLead: [
    {
      action: ['read', 'write', 'update', 'remove'],
      subject: ['Timesheet']
    },
    {
      action: 'read',
      subject: ['Reports']
    }
  ]
}
export const updateAbility = (authToken) => {
  const { can, rules } = new AbilityBuilder();
  const token = authToken || localStorage.getItem('authToken');
  const roles = ['Common'];
  if(token) {
    const { user : { role } } = decode(token);
    if(role) {
      roles.push(role);
    }
  } 
  roles.forEach(currentRole => {
    const permissions = rolesAccess[currentRole];
    if(permissions && permissions.length) {
      permissions.forEach(permission => {
        can(permission.action, permission.subject);
      })
    } 
  })
  ability.update(rules)
}
updateAbility();
export default ability;   