import { Router } from "express";

export default Router()
  .use("/users", () => console.log("users"))