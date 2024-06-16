import passCrypt from "./passCrypt";
const setCookie = async (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cryptData = await passCrypt.crypt(value)
    document.cookie = `${name}=${cryptData}; expires=${expirationDate.toUTCString()}; path=/`;
};
const getCookie = async (name) => {
    const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));

    return cookies ? await passCrypt.decrypt(cookies.split("=")[1]) : null;
};
const deleteCookie = async (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export default {setCookie,getCookie,deleteCookie}