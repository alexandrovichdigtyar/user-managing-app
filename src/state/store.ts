import { atom } from "jotai";

export const deleteItemIdAtom = atom<string | null>(null);

export const loadingAtom = atom<boolean>(false);

export const orderByAtom = atom<string>('');