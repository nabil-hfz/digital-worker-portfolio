export function buildImageUrl(req: any, filename: string): string {
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}

export function getFilenameFromImageUrl(imageUrl: string): string {
    const url = new URL(imageUrl);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();
    return filename || ''; 
    
}
