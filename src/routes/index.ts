import { Router } from "express";

export default Router()
  .use("/signup",( ) =>  console.log("signup"))
  .use("/users", () => console.log("users"))