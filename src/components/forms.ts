export const validPK = (v: string) => /^(?:\+?92|0092|0)?3\d{9}$/.test(v.replace(/[\s-]/g, ""));
