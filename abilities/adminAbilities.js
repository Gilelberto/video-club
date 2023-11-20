import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('READ', 'user');
  can('CREATE', 'user');
  can('UPDATE', 'user');
  can('DELETE', 'User');
}); 