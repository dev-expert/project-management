//ability.js
import { Ability, AbilityBuilder } from "@casl/ability";
import { decode } from 'jsonwebtoken'
const ability = new Ability([]);
export const updateAbility = () => {
  const { can, rules } = new AbilityBuilder();
  const token = localStorage.getItem('authToken');
  if(token) {
    const { user : { role } } = decode(token);
    switch(role) {
      case 'ADMIN':
      case 'MANAGER':
        can(['read', 'write', 'update', 'delete'], ['Users', 'Projects', 'Tasks', 'Common'])
      break;
      case 'EMPOLOYEE':
      case 'CLIENT':
        can(['read', 'write', 'update', 'delete'], ['Tasks'])
        can(['read'], ['Projects', 'Users', 'Common'])
      break;
      default:
        break;
    }
  } 
  ability.update(rules)
}
updateAbility();
export default ability;   