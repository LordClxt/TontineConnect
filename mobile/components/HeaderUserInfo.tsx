import React from "react";
import store from "@/store";
import T from "./ui/T";

const HeaderUserInfo = () => {
  const user = store((state) => state.user);
  return (
    <T variant="body" className="text-white/80">
      Bonjour {user.prenom ?? ""}
    </T>
  );
};

export default HeaderUserInfo;
