import CreateNewPrduct from "./create";
import DeleteProduct from "./delete";
import UpdateProduct from "./update";
import Pagination from "../components/paginations";
import { BASE_URL } from "../api/api";
import { getProducts, getTotalPages } from "../lib/data";

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

const ProductList = async ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) => {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;


    const products: Product[] = await getProducts(query, currentPage);
    const totalpage = await getTotalPages(query);

    return (
        <div className="py-10 px-10">
            <div className="py-4">
                <CreateNewPrduct />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>IMAGE</th>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, i) => {
                        const { id, title, price, category } = p;

                        return (
                            <tr key={id} className="justify-center">
                                <td>{id}</td>
                                <td>
                                    <img className="border-gray-400" src={category?.image} alt="Product Image" width={100} height={100} />
                                </td>
                                <td>{title}</td>
                                <td>{price}</td>
                                <td className="flex items-center">
                                    <div className="mr-1">
                                        <UpdateProduct {...p} />
                                    </div>
                                    <div>
                                        <DeleteProduct {...p} />

                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-center py-5">
                <Pagination totalPages={totalpage} />
            </div>
        </div>
    );
}

export default ProductList;