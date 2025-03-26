# xpr-mcp
A Model Context Protocol (MCP) server for the XPR Network blockchain
This is a demo server and provides these tools for LLM chat clients:

## MCP Tools (See code for param descriptions)
### get-xpr-supported-tokens
chai

### get-xtoken-balance-for-account
token

account
### buy (does not really do anything in this demo)
account

amount

token

privateKey
### sell (does not really do anything in this demo)
account

amount

token

privateKey

## Getting Started
Build: `npm run build`

Run: `npm run start`

## To use within the Claude Desktop application
- find the `claude_desktop_config.json` file
- add this config (update `path/to` to your local path):
```
{
    "mcpServers": {
        "xprnetwork": {
            "command": "node",
            "args": [                
                "path/to/xpr-mcp/dist/index.js"
            ]
        }
    }
}
```
- retstart Claude Desktop

## Use MCP tester
To test the functions in this MCP server, use the MCP Inspector tool:
https://modelcontextprotocol.io/docs/tools/inspector
`npx @modelcontextprotocol/inspector node path/to/server/index.js`
