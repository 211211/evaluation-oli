export const isMobile = (): boolean => {
    const isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    return isMobile
}
