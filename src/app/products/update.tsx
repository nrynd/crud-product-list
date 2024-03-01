"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../api/api";

type Product = {
    id: number,
    title: string,
    price: number,
    category: {
        id: number,
        name: string,
        image: string,
    },
}

export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();

        setIsMutating(true);

        await fetch(`${BASE_URL}/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm text-white" onClick={handleChange}>
                Edit
            </button>

            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="input w-full input-bordered"
                                placeholder="Price"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn bg-teal-100 hover:bg-teal-200">
                                    Update
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Updating...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}