/**
 * Error handling utilities for the Quran.com API MCP Server
 */

import { verboseLog } from './logger';

/**
 * Creates a standardized error response for clients
 * Logs detailed error information but returns a generic message to clients
 * 
 * @param error The error that occurred
 * @param toolName Optional name of the tool where the error occurred
 * @returns A sanitized error response object
 */
export function createErrorResponse(error: unknown, toolName?: string): { content: any[], isError: boolean } {
  // Log the detailed error for debugging
  verboseLog('error', {
    tool: toolName || 'unknown',
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : String(error)
  });
  
  // For validation errors, provide a helpful but not overly detailed message
  if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
    return {
      content: [{ 
        type: "text", 
        text: "Invalid request parameters. Please check your input and try again."
      }],
      isError: true,
    };
  }
  
  // Return a generic error message to the client
  return {
    content: [{ 
      type: "text", 
      text: "An error occurred processing your request. Please try again later."
    }],
    isError: true,
  };
}
