import { generateCacheKeys } from '../../utils'

test('Should return all valid cached-keys for https://www.thueringer-allgemeine.de', () => {
    const fullUrl: URL = new URL('https://www.thueringer-allgemeine.de')
    expect(generateCacheKeys(fullUrl)).toEqual([
        'h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0,sc=,auth=',
        'h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=1,sc=,auth=',
        'h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=0,sc=,auth=',
        'h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=1,sc=,auth=',
    ])
})

const SERVER_IPs = [
    '195.201.211.12',
    '195.201.211.13',
    '195.201.211.100',
    '195.201.211.101',
]
const SUFFIX = '/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/'
const SCHEME = 'https'
test('Should return all valid variations for https://www.thueringer-allgemeine.de', () => {
    const fullUrl: URL = new URL('https://www.thueringer-allgemeine.de')
    const variations: string[] = generateCacheKeys(fullUrl)


    const result: string[] = []
    SERVER_IPs.forEach((ip: string) => {
        variations.forEach((cachedKey: string) => {
            result.push(`${SCHEME}://${ip}${SUFFIX}${cachedKey}`)
        })
    })

    expect(result).toEqual(
        [
            "https://195.201.211.12/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.12/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.12/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.12/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.13/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.13/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.13/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.13/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.100/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.100/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.100/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.100/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=mobile,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
            "https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=0,sc=,auth=",
            "https://195.201.211.101/chaeleeth4sueHainae0eedeeMahmeiTh2oazeih-purge/h=www.thueringer-allgemeine.de,u=/,a=,d=desktop,i=0,p=1,s=https,ru=,ba=1,sc=,auth=",
        ]
    )
})