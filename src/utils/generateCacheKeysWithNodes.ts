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

import {args, auth, botOptions, devices, hasPageSpeed, insider, remoteUser, sCity, serverIPs, suffix} from '@/config'

type DEVICE = 'mobile' | 'desktop'
type BOT_ACCESS = '0' | '1'
type CITY = {
  [key: string]: string[]
}

export const generateCacheKeysWithNodes = (url: URL): string[] => {
  const {host, pathname, protocol = 'https:'} = url
  const uri = pathname
  const scheme = protocol.substr(0, protocol.length - 1) // always 'https'
  const cachedKeys: string[] = []

  const _sCity: CITY = sCity
  let cities: string[]
  const isSpecialDomain = Array.isArray(_sCity[host]) && _sCity[host].length > 0
  if (isSpecialDomain) {
    cities = _sCity[host] || []
  }

  devices.forEach((device: string) => {
    const uaDevice: DEVICE = device as DEVICE
    botOptions.forEach((botOption: string) => {
      const botAccess: BOT_ACCESS = botOption as BOT_ACCESS // ['0', '1'] (both variations)
      let cachedKey = ''
      if (isSpecialDomain) {
        cities.forEach((city: string) => {
          cachedKey = `h=${host},u=${uri},a=${args},d=${uaDevice},i=${insider},p=${hasPageSpeed},s=${scheme},ru=${remoteUser},ba=${botAccess},sc=${
            city || ''
          },auth=${auth}`
          cachedKeys.push(cachedKey)
        })
      } else {
        cachedKey = `h=${host},u=${uri},a=${args},d=${uaDevice},i=${insider},p=${hasPageSpeed},s=${scheme},ru=${remoteUser},ba=${botAccess},sc=,auth=${auth}`
        cachedKeys.push(cachedKey)
      }
    })
  })

  const variations: string[] = []
  serverIPs.forEach((ip: string) => {
    cachedKeys.forEach((cachedKey: string) => {
      variations.push(`${scheme}://${ip}${suffix}${cachedKey}`)
    })
  })

  return variations
}
