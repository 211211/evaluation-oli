export function ValidateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true
    }

    return false
}

export function isValidHttpUrl(url: string) {
    let _url

    try {
        _url = new URL(url)
    } catch (_) {
        return false
    }

    return _url.protocol === 'http:' || _url.protocol === 'https:'
}

export * from './generateCacheKeysWithNodes'
