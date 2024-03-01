import { BASE_URL } from "../api/api";

export const getProducts = async (query: string, currentPage: number) => {
    const ITEM_PER_PAGE = 5;
    const offset = (currentPage - 1) * ITEM_PER_PAGE;

    try {
        const res = await fetch(`${BASE_URL}?offset=${offset}&limit=${ITEM_PER_PAGE}`, {
            cache: "no-store",
        });

        return res.json();

    } catch (e) {
        throw new Error('Failed to fetch data');
    }
}

export const getTotalPages = async (query: string) => {
    const ITEMS_PER_PAGE = 10;

    try {
        const res = await fetch(BASE_URL, {
            cache: "no-store",
        });

        const data = await res.json();
        const plength = await data.length;

        const totalPages = Math.ceil(Number(plength) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        throw new Error("Failed to fetch contact data");
    }
}