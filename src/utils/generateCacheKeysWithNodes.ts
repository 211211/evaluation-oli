// 'https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/sport/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0/'
// $cacheKey = 'h=$host,u=$uri,a=$args,d=$ua_device,i=$insider,p=$has_pagespeed,s=$thescheme;ru=$remote_user,ba=$botaccess';
// $host = host of the URL
// $u = URL-path
// $args = empty
// $d = ['mobile', 'desktop'] (create both variations from previous results)
// $i = always is '0'
// $p = always '1'
// $s = always 'https'
// $ru = empty
// $ba = ['0', '1'] (both variations)
// $sc = empty or an array of keys. if domain is listed in $city (see below) create all variations for all values
// $auth = empty

import {ARGs, AUTH, BOT_OPTIONS, DEVICES, HAS_PAGESPEED, INSIDER, REMOTE_USER, SERVER_IPs, SUFFIX} from '@/config'

type UA_DEVICE_TYPE = 'mobile' | 'desktop'
type BOT_ACCESS_TYPE = '0' | '1'

export const generateCacheKeysWithNodes = (url: URL): string[] => {
  const {host, pathname, protocol = 'https:'} = url

  const HOST = host
  const URI = pathname
  const SCHEME = protocol.substr(0, protocol.length - 1) // always 'https'
  const SCITY = '' // empty or an array of keys. if domain is listed in $city (see below) create all variations for all values

  const cachedKeys: string[] = []
  DEVICES.forEach((device: string) => {
    const UA_DEVICE: UA_DEVICE_TYPE = device as UA_DEVICE_TYPE
    BOT_OPTIONS.forEach((botOption: string) => {
      const BOT_ACCESS: BOT_ACCESS_TYPE = botOption as BOT_ACCESS_TYPE // ['0', '1'] (both variations)
      const cachedKey: string = `h=${HOST},u=${URI},a=${ARGs},d=${UA_DEVICE},i=${INSIDER},p=${HAS_PAGESPEED},s=${SCHEME},ru=${REMOTE_USER},ba=${BOT_ACCESS},sc=${SCITY},auth=${AUTH}`
      cachedKeys.push(cachedKey)
    })
  })

  const variations: string[] = []
  SERVER_IPs.forEach((ip: string) => {
    cachedKeys.forEach((cachedKey: string) => {
      variations.push(`${SCHEME}://${ip}${SUFFIX}${cachedKey}`)
    })
  })

  return variations
}
