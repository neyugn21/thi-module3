import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy danh sách thể loại:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (Formdata) => {
    const today = new Date();

    const importDate = new Date(Formdata.importDate);

    if (importDate > today) {
      alert("Ngày nhập sản phẩm không được lớn hơn ngày hiện tại");
      return;
    }
    try {
      await axios.post("http://localhost:3000/products", Formdata);
      alert("Thêm thành công!");
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4 text-xl font-bold">Thêm mới thuốc</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group-form">
          <label htmlFor="" className="form-label">
            Mã sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            {...register("id", {
              required: "Không được để trống mã sản phẩm",
              pattern: {
                value: /^PROD-\d{4}$/,
                message: "Mã sản phẩm phải có định dạng PROD-XXXX",
              },
            })}
          />
          {errors.id && (
            <span className="text-red-500">{errors.id.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Tên thuốc
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Không được để trống tên thuốc" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Thể loại
          </label>
          <select
            className="form-control"
            {...register("categoryId", { required: "Vui lòng chọn thể loại" })}
          >
            <option value="">Chọn thể loại</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-red-500">{errors.categoryId.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Giá
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", {
              required: "Không được để trống giá",
              min: { value: 1, message: "Giá phải lớn hơn 1" },
            })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Số lượng
          </label>
          <input
            type="number"
            className="form-control"
            {...register("quantity", {
              required: "Không được để trống số lượng",
              min: {
                value: 1,
                message: "Số lượng phải lớn hơn 1",
              },
            })}
          />
          {errors.quantity && (
            <span className="text-red-500">{errors.quantity.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Ngày nhập
          </label>
          <input
            type="date"
            className="form-control"
            {...register("importDate", {
              required: "Không được để trống ngày nhập",
            })}
          />
          {errors.importDate && (
            <span className="text-red-500">{errors.importDate.message}</span>
          )}
        </div>

        <div className="group-form">
          <label htmlFor="" className="form-label">
            Mô tả
          </label>
          <input
            type="text"
            className="form-control"
            {...register("description", {
              required: "Không được để trống mô tả",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="mt-4">
          <button className="btn btn-outline-primary">Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
