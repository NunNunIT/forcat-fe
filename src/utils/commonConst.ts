// File: utils/common.ts

export const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL;
// export const BACKEND_URL: string = "http://localhost:8080/api";
export const BACKEND_URL_ORDERS: string = BACKEND_URL + "/orders";
export const ORDER_STATUS_LIST: string[] = [
  "all",
  "unpaid",
  "delivering",
  "finished",
  "cancel",
];
export const BACKEND_URL_REVIEWS: string = BACKEND_URL + "/reviews";
export const BACKEND_URL_NOTIFICATIONS: string = BACKEND_URL + "/notifications";
export const NOTIFICATION_STATUS_LIST: string[] = ["all", "order", "promotion"];
export const BACKEND_URL_NEWS: string = BACKEND_URL + "/articles";

export const BACKEND_URL_ADMIN_ORDER: string = BACKEND_URL + "/admin/orders";
export const BACKEND_URL_ADMIN_ARTICLE: string =
  BACKEND_URL + "/admin/articles";

export const CLOUDINARY_URL: string =
  "https://res.cloudinary.com/dmjwq3ebx/image/upload/v1712151655";
export const expirationTime = Date.now() + 86400000;
export const commonVariable2: number = 42;
