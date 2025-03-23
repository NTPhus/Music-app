import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
    const unidecodeText = unidecode(text.trim());

    const slug: string = unidecodeText.replace(/\s+/g,"-"); //tìm khoảng trắng thay thế bằng dấu -

    return slug;
}