export interface SystemInfo {
  system: {
    manufacturer: string
    model: string
    version: string
    serial: string
  }
  cpu: {
    manufacturer: string
    brand: string
    speed: number
    cores: number
    physicalCores: number
    processors: number
  }
  memory: {
    total: number
    free: number
    used: number
    active: number
  }
  os: {
    platform: string
    distro: string
    release: string
    kernel: string
    arch: string
    hostname: string
  }
  network: Array<{
    iface: string
    ip4: string
    ip6: string
    mac: string
  }>
  time: {
    current: number
    uptime: number
    timezone: string
    timezoneName: string
  }
}

export interface BlockchainData {
 label: string
 value: string
 usd: string
}

export interface FormValues {
  wallet: string
  sendTo: string
  address: string
  amount: string
  customizeFee: boolean
  transactionFee: string
  randomDelay: boolean
  minDelay: string
  maxDelay: string
  proxyType: string
  selectedProxy: string
  blockchainApi: string
  flashConfirmed: boolean
} 