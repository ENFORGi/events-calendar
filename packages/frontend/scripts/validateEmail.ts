export function isStrictValidEmail(email: string): boolean{
    return email.includes("@") ? true : false;
}