import { useEffect } from "react";

export function useKey(key, callBackF) {
  useEffect(
    function () {
    //   console.log("first");

      function kd(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
        //   console.log(e.code.toLowerCase())
          callBackF();
        //   console.log("aaa");
        }
      }

      document.addEventListener("keydown", kd);
      return function () {
        document.removeEventListener("keydown", kd);
      };
    },
    [callBackF, key]
  );
}
