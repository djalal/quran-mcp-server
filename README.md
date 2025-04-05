# MCP Server for Quran.com API
[![smithery badge](https://smithery.ai/badge/@djalal/quran-mcp-server)](https://smithery.ai/server/@djalal/quran-mcp-server)

MCP server to interact with Quran.com corpus via the official [REST API v4](https://api-docs.quran.com/docs/content_apis_versioned/4.0.0/content-apis).

## Overview

This is a Model Context Protocol (MCP) server generated from the [OpenAPI specification](v4.json).

## Endpoints

The following endpoints from the API have been made available as tools, that LLMs can use via compatible clients.

### Chapters
* GET /chapters - List Chapters
* GET /chapters/{id} - Get Chapter
* GET /chapters/{chapter_id}/info - Get Chapter Info

### Verses
* GET /verses/by_chapter/{chapter_number} - Get verses by Chapter / Surah number
* GET /verses/by_page/{page_number} - Get all verses of a specific Madani Mushaf page
* GET /verses/by_juz/{juz_number} - Get verses by Juz number
* GET /verses/by_hizb/{hizb_number} - Get verses by Hizb number
* GET /verses/by_rub/{rub_el_hizb_number} - Get verses by Rub el Hizb number
* GET /verses/by_key/{verse_key} - Get verse by key
* GET /verses/random - Get a random verse

### Juzs
* GET /juzs - Get list of all juzs

### Search
* GET /search - Search the Quran for specific terms

### Translations
* GET /resources/translations - Get list of available translations
* GET /resources/translations/{translation_id}/info - Get information of a specific translation

### Tafsirs
* GET /resources/tafsirs - Get list of available tafsirs
* GET /resources/tafsirs/{tafsir_id}/info - Get the information of a specific tafsir
* GET /quran/tafsirs/{tafsir_id} - Get a single tafsir

### Audio
* GET /resources/chapter_reciters - List of Chapter Reciters
* GET /resources/recitation_styles - Get the available recitation styles

### Languages
* GET /resources/languages - Get all languages

## Setup

### Installing via Smithery

To install Quran.com API Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@djalal/quran-mcp-server):

```bash
npx -y @smithery/cli install @djalal/quran-mcp-server --client claude
```

### Requirements

* Node.js 22+
* Docker

### Building the Docker Image

Before using the Docker-based production mode, you need to build the Docker image:

```bash
# Build the Docker image
docker build -t quran-mcp-server .
```

## Claude Desktop Integration

To use this MCP server with Claude Desktop, add the following configuration to your `claude_desktop_config.json` file (typically located at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

### Docker-based Production Mode

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "-e", "API_KEY=your_api_key_if_needed", "-e", "VERBOSE_MODE=true", "quran-mcp-server"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Production Mode (Node.js)

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "node",
      "args": ["/path/to/quran-mcp-server/dist/src/server.js"],
      "env": {
        "API_KEY": "your_api_key_if_needed",
        "VERBOSE_MODE": "true" // Set to "true" to enable verbose logging
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Development Mode

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "npx",
      "args": ["ts-node", "/path/to/quran-mcp-server/src/server.ts"],
      "env": {
        "API_KEY": "your_api_key_if_needed",
        "VERBOSE_MODE": "true" // Set to "true" to enable verbose logging
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

**Important Notes:**
- Replace `/path/to/quran-mcp-server` with the actual path to this repository on your system
- You'll need to build the project first with `npm run build` or `docker build -t quran-mcp-server .` if using the production mode configuration
- Replace `your_api_key_if_needed` with an actual API key if required by the Quran.com API
- If you already have other MCP servers configured, add this configuration to the existing `mcpServers` object
- After updating the configuration, restart Claude Desktop for the changes to take effect

## Environment Variables

* `API_KEY`: API key for authentication
* `PORT`: Server port (default: 8000 or 3000 depending on language)
* `VERBOSE_MODE`: Set to 'true' to enable verbose logging of API requests and responses (default: false)

## Verbose Mode

When `VERBOSE_MODE` is set to 'true', the server will log detailed information about API requests and responses to the console. This is useful for debugging and monitoring API interactions.

The verbose logging includes:

* **Requests**: Logs the tool name and arguments for each incoming request
* **Responses**: Logs the tool name and result data for each response
* **Errors**: Logs detailed error information including error name, message, and stack trace when available

Each log entry is timestamped and prefixed with the log type (REQUEST, RESPONSE, or ERROR) for easy identification.

## Testing

```bash
# Run tests
npm test
```

## License

This project is licensed under the MIT License.
