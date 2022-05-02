import DOMPurify from "dompurify";

export const handleSanitize = ( content: any ) => {
    return process.browser ? DOMPurify.sanitize( content ) : content;
}