import { Injectable, Inject, OpaqueToken } from '@angular/core';

import { LoggerConfig } from './logger.config';

export const apiConfig = new OpaqueToken('api-config');

@Injectable()
export class LoggerService {
  constructor(@Inject(apiConfig) public apiConfig: LoggerConfig) { }
}
