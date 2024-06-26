import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import ProductTable from "../component/ProductTable";

const AdminProduct = () => {
  const navigate = useNavigate();
  const {productList, totalPageNum} = useSelector(state=>state.product)
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  const [mode, setMode] = useState("new");
  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

    useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if (searchQuery.name === ''){
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
    dispatch(productActions.getProductList({ ...searchQuery }))
  }, [searchQuery, showDialog, query]);

  const deleteItem = (id) => {
    // 아이템 삭제하기
    dispatch(productActions.deleteProduct(id));
  };

  const openEditForm = (product) => {
    //edit모드로 설정하고
    setMode('edit');
    // 아이템 수정다이얼로그 열어주기
    dispatch({type:types.SET_SELECTED_PRODUCT, payload: product}) //async가 아니기때문에 미들웨어 안거치고 바로 타입으로간다! 그리고 리퀘스트 뭐 그런거 따로없고
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    //new 모드로 설정하고
    setMode('new')
    // 다이얼로그 열어주기
    setShowDialog(true)
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    setSearchQuery({ ...searchQuery, page: selected + 1})
  };
  //searchbox에서 검색어를 읽어온다 => 엔터를 치면 => searchQuery객체가 업데이트가 됨 {name: 스트레이트 팬츠}
  //=>searchQuery객체 안에 아이템 기준으로 url을 새로 생성해서 호출 $name=스트레이트+팬츠 
  //=> url쿼리 읽어오기
  //=> url쿼리 기준으로 BE에 검색조건과 함께 호출한다.

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5} //몇개의 페이지를 보여줄지
          pageCount={totalPageNum} //전체페이지
          forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
          previousLabel="< previous"
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
          className="display-center list-style-none"
        />
      </Container>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProduct;
