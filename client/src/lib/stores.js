import { writable } from "svelte/store";
export const searchStatus = writable('ready');
export const tagArray = writable([]);
export const tagSearchFlagStore = writable(false);