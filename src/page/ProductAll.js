import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";
import PopupCard from '../component/PopupCard';

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.product.error);
  const searchKeyword = useSelector((state) => state.product.searchKeyword);
  const { productList, totalPageNum } = useSelector(state => state.product);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
    category: query.get("category") || "",
  }); //검색 조건들을 저장하는 객체

  const { isFirst } = useSelector((state) => state.banner);
  const [isPopup, setIsPopup] = useState(isFirst);  

	const handlePopupClose = () => {
		setIsPopup(false);
    dispatch({ type: 'SET_FIRST_MAIN', payload: false });
	};  

	useEffect(() => {
		setIsPopup(isFirst);
	}, [isFirst]);
  

  useEffect(() => {
    if (searchQuery.category !== "") {
      setIsPopup(false);
    }    
  }, [])

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query])


  // 처음 로딩하면 상품리스트 
  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }
    if (searchQuery.name === "undefined") {
      delete searchQuery.name;
    }    

    if (searchQuery.category === "all") {
      delete searchQuery.category;
    }    

    // URLSearchParams - 객체를 쿼리로 만들어줌
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
    console.log("searchQuery = ", searchQuery);
    console.log("query = ", query);
    // dispatch(productActions.getProductList({ ...searchQuery }))
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery({ ...searchQuery, name: searchKeyword });
  }, [searchKeyword])


  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기 - 실제페이지는 selected + 1
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };


  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            <Container>
              <Row>
                {productList.length > 0 ? (
                    productList?.map((product, index) =>
                      <Col key={index} className="card" md={3} sm={12}>
                        <ProductCard product={product} />
                      </Col>
                    )
                ):(

                <div className="text-align-center empty-bag">
                {searchQuery.name === "" ? (
                    <h2>등록된 상품이 없습니다!</h2>
                ) : (
                    // <h2>{searchQuery.name}과 일치한 상품이 없습니다!</h2>
                    <h2>조건과 일치한 상품이 없습니다!</h2>
                )}
              </div>
                )}  
              </Row>          

              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}  // 몇 개 페이지 보여줄지
                pageCount={totalPageNum}   // 전체 페이지
                forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                activeLinkClassName="active-link"
                disabledClassName="disabled"
                disabledLinkClassName="disabled-link"
                className="display-center list-style-none"
              />
              <PopupCard showPopup={isPopup} setShowPopup={handlePopupClose} />
            </Container>
          )
      }
    </>

  );
};

export default ProductAll;