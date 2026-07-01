export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  errorUser: { username: 'error_user', password: 'secret_sauce' },
  visualUser: { username: 'visual_user', password: 'secret_sauce' },
  invalidPassword: { username: 'standard_user', password: 'wrong_password' },
  empty: { username: '', password: '' },
  sqlInjection: { username: "' OR '1'='1", password: "' OR '1'='1" },
  whitespace: { username: '   ', password: '   ' },
};

export const checkoutInfo = {
  valid: { firstName: 'Maria', lastName: 'Fernanda', postalCode: '77000-000' },
  missingFirstName: { firstName: '', lastName: 'Fernanda', postalCode: '77000-000' },
  missingLastName: { firstName: 'Maria', lastName: '', postalCode: '77000-000' },
  missingPostalCode: { firstName: 'Maria', lastName: 'Fernanda', postalCode: '' },
};
