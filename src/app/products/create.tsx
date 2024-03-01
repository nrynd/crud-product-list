"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from '../api/api';

export default function CreateNewPrduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        setIsMutating(true);

        await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                price: price,
                description: "A description",
                categoryId: 1,
                images: ["https://placeimg.com/640/480/any"]
            }),
        });

        setIsMutating(false);

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <div className="flex justify-end">
                <button className="btn bg-teal-100 hover:bg-teal-200" onClick={handleChange}>
                    Create New
                </button>
            </div>


            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Product</h3>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setPrice(e.target.value)}
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
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Saving...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}