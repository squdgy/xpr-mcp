import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { AccountTokensResponse, TokensResponse } from "./interfaces.js";

const BLOKS_API_BASE = "https://www.api.bloks.io/proton-test";
const USER_AGENT = "xprnetwork-mcp/1.0";

// Create server instance
const server = new McpServer({
  name: "xprnetwork",
  description: "XPR Network blockchain MCP Server, used for interacting with the XPR Network blockchain",
  version: "1.0.0",
});

// Helper function for making Bloks API requests
async function makeBloksRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making Bloks request:", error);
    return null;
  }
}


// Register tools
server.tool(
  "get-xtoken-balance-for-account",
  "Get the cryptocurrency account balance for an account name",
  {
    token: z.string().describe("The xtoken symbol (e.g. BTC, XBTC, USDC, XUSDC)"),
    account: z.string().describe("Alphanumeric name describing an account on the xpr network (e.g. protonnz, metalpayouts, guild.nefty)"),
  },
  async ({ token, account }) => {
    var searchToken = token;
    if (token[0] === 'X' && token !== 'XPR') {
      searchToken = token.substring(1);
    }
    const tokensUrl = `${BLOKS_API_BASE}/account/${account}?type=getAccountTokens&coreSymbol=XPR`;
    console.log(tokensUrl);
    const tokensData = await makeBloksRequest<AccountTokensResponse>(tokensUrl);
    if (!tokensData) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve account balance ${tokensUrl}`,
          },
        ],
      };
    }

    // find the requested token in the tokens array and return the amount
    const tokenDetail = tokensData.tokens.find(tokenData => tokenData.currency === token);
    const returnText = `${account} has ${tokenDetail?.amount} ${token}, worth $${tokenDetail?.usd_value}`;

    return {
      content: [
        {
          type: "text",
          text: returnText,
        },
      ],
    };
  },
);

server.tool(
  "get-xpr-supported-tokens",
  "Get the tokens that are supported on the XPR network",
  {
    chain: z.string().describe("The chain to get the supported tokens for. Examples would be proton, wax, xpr network")
  },
  async ({ chain }) => {
    const tokensUrl = `${BLOKS_API_BASE}/tokens?chain=proton-test`;
    console.log(tokensUrl);
    const tokensData = await makeBloksRequest<TokensResponse[]>(tokensUrl);
    if (!tokensData) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve token list ${tokensUrl}`,
          },
        ],
      };
    }

    // only return the list of symbols and names, leave everything else out
    const tokenList = tokensData.map(tokenData => `${tokenData.symbol}, ${tokenData.metadata.name}`);

    return {
      content: [
        {
          type: "text",
          text: tokenList.join("\n"),
        },
      ],
    };
  },
);

server.tool(
  "buy",
  "Buy tokens on XPR network",
  {
    account: z.string().describe("Alphanumeric name describing an account on the xpr network (e.g. protonnz, metalpayouts, guild.nefty)"),
    amount: z.number().describe("The amount of tokens to buy"),
    token: z.string().describe("The xtoken symbol (e.g. BTC, XBTC, USDC, XUSDC)"),
    privateKey: z.string().describe("The private key of the account")
  },
  async ({ account, amount, token, privateKey }) => {
      return {
        content: [
          {
            type: "text",
            text: `You just bought ${amount} ${token} for account ${account}`,
          },
        ],
      };
  },
);

server.tool(
  "sell",
  "Sell tokens on XPR network",
  {
    account: z.string().describe("Alphanumeric name describing an account on the xpr network (e.g. protonnz, metalpayouts, guild.nefty)"),
    amount: z.number().describe("The amount of tokens to sell"),
    token: z.string().describe("The xtoken symbol (e.g. BTC, XBTC, USDC, XUSDC)"),
    privateKey: z.string().describe("The private key of the account")
  },
  async ({ account, amount, token, privateKey }) => {
      return {
        content: [
          {
            type: "text",
            text: `You just sold ${amount} ${token} for account ${account}`,
          },
        ],
      };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("XPR Network blockchain MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});