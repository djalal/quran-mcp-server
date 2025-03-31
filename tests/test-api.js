#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  console.log('Starting main function');
  try {
    console.log('Creating transport');
    // Create a client that connects to the server via stdio
    const transport = new StdioClientTransport({
      command: '/opt/homebrew/bin/node',
      args: ['dist/server.js'],
      env: { VERBOSE_MODE: 'true' }
    });
    
    console.log('Creating client');
    const client = new Client({
      name: 'Test Client',
      version: '1.0.0'
    });
    console.log('Connecting to server');
    await client.connect(transport);
    
    console.log('Connected to MCP server');
    
    // Test the GET-chapter tool
    console.log('\nTesting GET-chapter tool...');
    try {
      const chapterResult = await client.callTool('GET-chapter', {
        language: 'en',
        id: '1'
      });
      console.log('GET-chapter result:', JSON.stringify(chapterResult, null, 2));
    } catch (error) {
      console.error('Error calling GET-chapter:', error);
    }
    
    // Close the connection
    await client.close();
    console.log('Disconnected from MCP server');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
