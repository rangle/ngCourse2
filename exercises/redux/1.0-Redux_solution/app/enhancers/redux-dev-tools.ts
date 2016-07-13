const environment: any = window || this;
export const reduxDevTools = environment.devToolsExtension ?
  environment.devToolsExtension() :
  null;
