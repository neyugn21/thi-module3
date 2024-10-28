import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import List from "./Component/List";
import Add from "./Component/Add";

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="add" element={<Add />} />
      </Routes>
    </Fragment>
  );
}
