import {LogEntry} from './log'

export interface Node {
  message: string
  ip: string
  url: string
  status: number
  cachedKey: string
}

export interface Invalidate {
  ok: boolean
  data?: Node[]
  logs: LogEntry[]
  error?: string
}
