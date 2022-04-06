import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
export const DummyLogin = () => {
  const history = useHistory();
  const [, setCookie] = useCookies(["user"]);

  const onClickDummyStudent = () => {
    setCookie(
      "token",
      // token adam
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTY4NzIsIm5pcG5ycCI6IjIxMTAxODEwNTQiLCJuYW1hIjoiUml6a3kgQWRhbSBQYW1idWRpIiwiaGFrQWtzZXMiOlsibWFoYXNpc3dhIl0sImlhdCI6MTY0NjcwMzYwMX0.QPv9Lnf-JesnrrBgbUkUckNR3xggiIS2OIxZc_wqqBw"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiSWxoYW0gRHdpIEt1cm5pYXdhbiIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDg2OTc4MDl9.HV3G5ArD14jU8dFlgtEaj072i9LnXNh0p0NCWTcwvPI"
      // token nisar
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTYwNTksIm5pcG5ycCI6IjIxMTAxODEwMTMiLCJuYW1hIjoiTXVoIE5pc2FyIFlhbnVhciBVdG9tbyIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDg2OTkyMjd9.NneCStwbrF9mMlNGzKEo1MeguLamaphrueuHehqIqP0"
      // token sherly
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTQ1NTQsIm5pcG5ycCI6IjIxMTAxNzEwMDkiLCJuYW1hIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2Mjk1NDU3NDl9.OdPGnlsjRxZzjnaWK0B_uDpbBI79oPsy-TFfiUgXAvU"
      // token ilham
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiSWxoYW0gRHdpIEt1cm5pYXdhbiIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDM3Njg1MTB9.LdAfxDp6gomlkZL0mOeuKP3yn3zaFoPDj1RBFu1bqSo"
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
