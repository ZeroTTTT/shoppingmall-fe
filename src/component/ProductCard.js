import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);    
  };


  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img
        src={product.image}
        alt={product.name}
      />
      <div className='nametext'>{product.name}<h5 className='new-text'>{product?.isNew == true ? "NEW" : ""}</h5></div>
      <div className={`price`}>₩{product.price}</div>

    </div>
  );
};

export default ProductCard;