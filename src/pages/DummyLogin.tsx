import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
export const DummyLogin = () => {
  const history = useHistory();
  const [, setCookie] = useCookies(["user"]);

  const onClickDummyStudent = () => {
    setCookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTQ1NTQsIm5pcG5ycCI6IjIxMTAxNzEwMDkiLCJuYW1hIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2Mjk1NDU3NDl9.OdPGnlsjRxZzjnaWK0B_uDpbBI79oPsy-TFfiUgXAvU"
    );
    history.replace("");
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-blue-50 justify-center items-center">
      <button
        onClick={onClickDummyStudent}
        className="bg-blue-600 hover:bg-blue-800 transition text-white py-2 px-4 rounded"
      >
        Login as Student
      </button>
    </div>
  );
};

export default DummyLogin;
