import React, {useState} from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";

function Singers() {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  let handleUpdateCategory = val => {
    setCategory(val);
  };

  let handleUpdateAlpha = val => {
    setAlpha(val);
  };

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCategory}
        oldVal={category}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        oldVal={alpha}
      />
    </NavContainer>
  );
}
export default React.memo(Singers);
