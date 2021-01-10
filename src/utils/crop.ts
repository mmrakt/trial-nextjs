type ICrop = {
    unit: string
    x: number
    y: number
    width: number
    height: number
    aspect: number
}

export const defaultCrop = {
    unit: '%',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    aspect: 1,
}

export const imageCropped = (
    imageRef: HTMLImageElement,
    crop: ICrop
): HTMLCanvasElement => {
    if (imageRef && crop.width && crop.height) {
        const canvas = document.createElement('canvas')
        const scaleX = imageRef.naturalWidth / imageRef.width
        const scaleY = imageRef.naturalHeight / imageRef.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')
        if (ctx !== null) {
            ctx.drawImage(
                imageRef,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            )
        }
        return canvas
    }
}
