
// AccountTokensReponse export interfaces
export interface AccountTokensResponse {
  tokens: Token[]
  total_tokens_usd: number
}

export interface Token {
  key: string
  currency: string
  amount: number
  contract: string
  decimals: string
  metadata: Metadata
  exchanges: Exchange[]
  usd_value: number
}

export interface Metadata {
  name?: string
  website?: string
  logo: string
  created_at?: string
  desc?: string
}

export interface Exchange {
  name: string
  price: number
  price_usd: number
}

// TokensReponse export interfaces
export interface TokensResponse {
  key: string
  symbol: string
  account: string
  chain: string
  supply: Supply
  metadata: TokensMetadata
  pairs: Pair[]
  price: Price
  rank: any
  chain_rank: any
}

export interface Supply {
  circulating: number
  max: number
  precision: number
  last_update: string
}

export interface TokensMetadata {
  name: string
  website: string
  logo: string
  created_at: string
  desc?: string
}

export interface Pair {
  id: string
  pair_base: string
  pair_quote: string
  exchange: string
  quote: Quote
  percentage_daily_volume: number
}

export interface Quote {
  price: number
  volume_base_24h: number
  volume_quote_24h: number
  market_cap: number
  price_usd: number
  volume_usd_24h: number
}

export interface Price {
  quotes: Quotes
  usd: number
  volume_base_24h: number
  volume_usd_24h: number
  marketcap_usd: number
  change_24hr: number
}

export interface Quotes {
  EOS: number
  XEOS: number
  BTC: number
  XBTC: number
  ETH: number
  XETH: number
  USDT: number
  XUSDT: number
  XPR: number
  WAX: number
  MTL: number
  XMT: number
  METAL: number
  USD: number
  USDC: number
  XUSDC: number
  XMD: number
}
