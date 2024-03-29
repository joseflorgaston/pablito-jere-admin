export function capitalize(str: string): string {
    const firstLetter: string = str.charAt(0).toUpperCase();
    return firstLetter + str.slice(1);
}

export function isBase64(source: string): boolean {
    try {
        window.atob(source);
        return true;
    } catch (error) {
        return false;
    }
}

export async function urlToBase64(url: string): Promise<string | ArrayBuffer> {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}