/**
 * Logger utilities for the Quran.com API MCP Server
 */

import { VERBOSE_MODE } from '../config';

/**
 * Logger utility for verbose mode
 * @param type The type of log (request, response, error)
 * @param data The data to log
 */
export function verboseLog(type: 'request' | 'response' | 'error', data: any): void {
  if (!VERBOSE_MODE) return;
  
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [VERBOSE] [${type.toUpperCase()}]`;
  
  console.error(`${prefix} ${JSON.stringify(data, null, 2)}`);
}
