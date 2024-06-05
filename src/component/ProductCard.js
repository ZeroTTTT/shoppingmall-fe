import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };

  const pickIsTrue = () => {
    return product.choice ? true : false
  }

  return (
    <div className="card" onClick={() => showProduct("hard_code")}>
      <img
        src={product.image}
        alt={product.name}
      />
      {/* <div className="brandname">{product.brand}</div> */}
      {/* <div className={`pickbox${pickIsTrue ? "_switched" : ""}`}>{product?.choice == true ? "[MD PICK]" : ""}</div> */}
      <div className='nametext'>{product.name}<h5 className='new-text'>{product?.isNew == true ? "NEW" : ""}</h5></div>
      <div className={`price`}>₩{product.price}</div>
      {/* <div className='saleprice'><b className={'saleper'}>{Math.round((product.price - product.salePrice) / product.price * 100)}%</b> ₩{product.salePrice}</div> */}

    </div>
  );
};

export default ProductCard;