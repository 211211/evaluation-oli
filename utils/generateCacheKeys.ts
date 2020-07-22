// 'https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/sport/,a=,d=mobile,i=0,p=1,s=https;ru=,ba=0/'
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

const MOBILE: string = 'mobile'
const DESKTOP: string = 'desktop'
const DEVICES: string[] = [MOBILE, DESKTOP]

const HAS_BOT_ACCESS: string = '1'
const NO_BOT_ACCESS: string = '0'
const BOT_OPTIONS: string[] = [NO_BOT_ACCESS, HAS_BOT_ACCESS]

type UA_DEVICE = 'mobile' | 'desktop'
type BOT_ACCESS = '0' | '1'
type SCHEME = 'https'


export const generateCacheKeys = (url: URL, headers?: Headers): string[] => {
    console.log({ headers })
    const {
        host,
        pathname,
        protocol = 'https:'
    } = url

    const $host = host
    const $uri = pathname
    const $args = ''
    const $insider = '0' // always is '0'
    const $has_pagespeed = '1' // always '1'
    const $scheme: SCHEME = protocol.substr(0, protocol.length - 1) as SCHEME // always 'https'
    const $remote_user = '' // always is empty
    const $sc: string = '' // empty or an array of keys. if domain is listed in $city (see below) create all variations for all values
    const $auth: string = ''

    const variations: string[] = []
    DEVICES.forEach((device: string) => {
        const $ua_device: UA_DEVICE = device as UA_DEVICE
        BOT_OPTIONS.forEach((botOption: string) => {
            const $bot_access: BOT_ACCESS = botOption as BOT_ACCESS // ['0', '1'] (both variations)
            const cachedKey: string = `h=${$host},u=${$uri},a=${$args},d=${$ua_device},i=${$insider},p=${$has_pagespeed},s=${$scheme},ru=${$remote_user},ba=${$bot_access},sc=${$sc},auth=${$auth}`
            variations.push(cachedKey)
        })
    })

    return variations
}
