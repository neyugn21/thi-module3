import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    const { data: productsData } = await axios.get(
      "http://localhost:3000/products"
    );
    const { data: categoriesData } = await axios.get(
      "http://localhost:3000/categories"
    );

    setCategories(categoriesData);
    setList(productsData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeItem = async (id) => {
    const isConfirm = window.confirm("Bạn có muốn xoá không?");
    if (!isConfirm) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      alert("Xóa thành công !");
      setList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log(error);
    }
  };

  // Hàm tìm kiếm
  const filteredList = searchTerm
    ? list.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : list; // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách

  return (
    <div className="container">
      <h1 className="text-center mb-4 text-xl font-bold">Danh sách thuốc</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <Link to={"/add"}>
        <button className="btn btn-primary mb-4">Thêm sản phẩm</button>
      </Link>

      {filteredList.length === 0 ? (
        <div className="text-center text-danger">Không có kết quả</div>
      ) : (
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Thể loại</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Ngày nhập</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {categories.find((cat) => cat.id === item.categoryId)?.name ||
                    "Chưa xác định"}
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.importDate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
