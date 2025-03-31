#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  try {
    // Create a client that connects to the server via stdio
    const transport = new StdioClientTransport({
      command: '/opt/homebrew/bin/node',
      args: ['dist/server.js'],
      env: { VERBOSE_MODE: 'true' }
    });
    
    const client = new Client({
      name: 'Test Client',
      version: '1.0.0'
    });
    await client.connect(transport);
    
    console.log('Connected to MCP server');
    
    // List available tools
    const tools = await client.listTools();
    console.log('Available tools:', tools);
    
    // Test the GET-chapter tool
    console.log('\nTesting GET-chapter tool...');
    const chapterResult = await client.callTool('GET-chapter', {
      language: 'en',
      id: '1'
    });
    console.log('GET-chapter result:', JSON.stringify(chapterResult, null, 2));
    
    // Test the list-chapters tool
    console.log('\nTesting list-chapters tool...');
    const chaptersResult = await client.callTool('list-chapters', {
      language: 'en'
    });
    console.log('list-chapters result:', JSON.stringify(chaptersResult, null, 2));
    
    // Test the info tool
    console.log('\nTesting info tool...');
    const infoResult = await client.callTool('info', {
      language: 'en',
      chapter_id: '1'
    });
    console.log('info result:', JSON.stringify(infoResult, null, 2));
    
    // Close the connection
    await client.close();
    console.log('Disconnected from MCP server');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
