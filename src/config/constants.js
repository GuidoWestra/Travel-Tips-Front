export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://travel--tips.herokuapp.com"
    : "http://localhost:4000";

export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxtq8ajzg/upload";
