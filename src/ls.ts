// localstorage

const retrieve = (key: string): any => {
    const item = localStorage.getItem(key);
    if (item) return item;
    return null;
}

const has = (key: string): boolean => localStorage.getItem(key) !== null;

const save = (key: string, value: any): void => {
    localStorage.setItem(key, value);
}

const lose = (key: string): void => { localStorage.removeItem(key) };

export { retrieve, has, save, lose };
