export const extractInstagramName = (link) => {
    return "@" + link.split("https://instagram.com/")[1]
        .split("?")[0];
}
