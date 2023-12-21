export const configurationMock = [
  {
    id: 'cd5fa417-b667-482d-b208-798d9da3213z',
    id_enviroment: 'cd5fa417-b667-482d-b208-798d9da3213z',
    country_iso: 2,
    brand: 1,
    operation_type: 2,

    name: 'ISO 8583 93 - Brazil AMEX Athorization',
    version: 'Version 1.0',

    descriptiom:
      'Do incididunt cillum duis eu pariatur enim proident minim officia amet proident consequat consequat qui consequat magna magna occaecat aliquip culpa pariatur velit nisi nostrud irure eu ullamco exercitation sint.Cillum deserunt laborum laborum quis nisi enim et aliquip labore excepteur in excepteur labore amet in ipsum ipsum nostrud deserunt lorem nisi voluptate dolor minim enim ut eu cupidatat enim.',

    enabled: true,

    environment: { id: 'cd5fa417-b667-482d-b208-798d9da3213f', name: 'Draft' },

    enum_brand: { id: 2, name: 'AMEX-CREDIT' },
    enum_operation_type: { id: 1, name: 'Authorization' },
    enum_country: { id: 1, name: 'Brasil' },

    /* desconsiderar */
    title: 'AMEX-CREDIT',
    company: 'PagoNxt',
    avatar: 'assets/images/flags/brazil.png',
    background: 'assets/images/parametrizador-backgroung.png',
  } /* others */,
];

export const setConfigurationMockValue = (newValue: any) => {
  Object.assign(configurationMock, newValue);
};
