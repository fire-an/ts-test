import { useEffect, useState } from "react";
import { IProduct } from "../types/product";
interface IProps {
  products: IProduct[];
  onRemove: (id: number) => void;
}
const ProductPage = (props: IProps) => {
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    setData(props.products);
  }, [props]);
  const removeProduct = (id: number) => {
    props.onRemove(id);
  };
  return (
    <div>
      <h1 className="font-black">Product Page</h1>
      <div className="grid grid-cols-3 gap-8">
        {data.map((product) => {
          return (
            <div key={product.id}>
              <img src={product.image} alt="" />
              <a href={"/products/" + product.id}>{product.name}</a>
              <p>{product.price}</p>
              {/* <button onClick={() => removeProduct(product.id)}>Remove</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
