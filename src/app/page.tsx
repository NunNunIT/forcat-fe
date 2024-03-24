import { CustomerSlider } from "@/components";
import { CustomerCategories } from "@/components";
//import libs
import React from "react";
import Link from "next/link";

// import global components
import { CustomerCarousel } from "@/components";
import { CustomerProductCard } from "@/components";
import { CustomerHeader, CustomerFooter } from "@/partials";

// use css
import "./page.css";

export default function HomePage() {
  return (
    <>
      <CustomerHeader />
      <CustomerSlider></CustomerSlider>
      <CustomerCategories></CustomerCategories>
      <main className="content-container">
        <CustomerCarousel></CustomerCarousel>
        <section className="tip-products-wrapper new-products">
          <div className="tip-products__img">
            <img src="/imgs/banner.png" alt="banner-new" />
          </div>
          <div className="tip-products">
            <div className="tip-products__label">
              <h2 className="tip-products__title">Hàng mới về</h2>
              <div className="tip-products__more">
                <Link className="tip-products__see-all-btn" href="#">
                  Xem tất cả
                </Link>
                <span className="material-symbols-outlined">
                  {" "}
                  chevron_right{" "}
                </span>
              </div>
            </div>
            <div className="tip-products__content">
              <CustomerProductCard></CustomerProductCard>
              <CustomerProductCard></CustomerProductCard>
              <CustomerProductCard></CustomerProductCard>
              <CustomerProductCard></CustomerProductCard>
              <CustomerProductCard></CustomerProductCard>
            </div>
          </div>
        </section>
      </main>
      <CustomerFooter />
    </>
  );
}
