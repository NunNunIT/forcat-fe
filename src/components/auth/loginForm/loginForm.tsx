"use client";

import styles from "../authForm.module.css";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";

import classNames from "classnames/bind";
import { useState } from "react";
import { isValidEmail } from "@/utils/index";
import { BACKEND_URL } from "@/utils/common_const";
import OAuth from "../oAuth/oAuth";

const cx = classNames.bind(styles);

const LoginForm = () => {
  const initialForms = {
    user_email: "",
    user_password: "",
  };

  const [formData, setFormData] = useState(initialForms);
  const [errors, setErrors] = useState(initialForms);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialForms);

    // Check for validation
    let isValid = true;
    const newErrors = { ...initialForms };

    if (!formData.user_email) {
      newErrors.user_email = "Email không được bỏ trống!";
      isValid = false;
    } else if (!isValidEmail(formData.user_email)) {
      newErrors.user_email = "Email không đúng định dạng!";
      isValid = false;
    }

    if (!formData.user_password) {
      newErrors.user_password = "Mật khẩu không được bỏ trống!";
      isValid = false;
    } else if (formData.user_password.length < 8) {
      newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
      isValid = false;
    }

    // Update state with errors
    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        setErrors(initialForms);
        const res = await fetch(BACKEND_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Assuming formData is an object
        });
        const data = await res.json();
        setLoading(false);

        if (data.status == 404) {
          newErrors.user_email = "Tài khoản không tồn tại!";
          setErrors(newErrors);
          return;
        } else if (data.status == 401) {
          newErrors.user_email = "Email không chính xác!";
          newErrors.user_password = "Mật khẩu không chính xác!";
          setErrors(newErrors);
          return;
        }
        redirect("/");
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };
  return (
    <form className={cx("form-auth")} onSubmit={handleSubmit}>
      <div className={cx("form-auth__title")}>
        <h1>Chào mừng bạn quay trở lại!</h1>
        <Link href="/register">
          <h3>
            Chưa có tài khoản? <b>Đăng ký ngay</b>{" "}
          </h3>
        </Link>
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Nhập email "
          name="user_email"
          id="user_email"
          onChange={handleChange}
        />
        {errors.user_email && (
          <p className={cx("text-error", "form-error")}>{errors.user_email}</p>
        )}
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          name="user_password"
          id="user_password"
          onChange={handleChange}
        />
        {errors.user_password && (
          <p className={cx("text-error", "form-error")}>
            {errors.user_password}
          </p>
        )}
      </div>

      <button disabled={loading} className={cx("form-button")}>
        <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
      </button>
      < OAuth />
    </form>
  );
};

export default LoginForm;
