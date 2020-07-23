import { generateCacheKeysWithNodes } from '../../utils'

test('Should return all valid variations for https://www.thueringer-allgemeine.de', () => {
    const fullUrl: URL = new URL('https://www.thueringer-allgemeine.de')
    const variations = generateCacheKeysWithNodes(fullUrl)

    expect(variations).toEqual(
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