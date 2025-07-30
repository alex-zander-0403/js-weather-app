import "./styles/main.css";
import { initApp } from "./init.js";

initApp();

function fn1() {
  const myObj = { key: "property" };
  console.log(myObj.qwe.rty);
}

fn1();
