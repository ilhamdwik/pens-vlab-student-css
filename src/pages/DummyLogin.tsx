import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
// import { ReactComponent as LogoText } from "../assets/images/logo-text.svg";

export const DummyLogin = () => {
  const history = useHistory();
  // const [tokenStudent, setTokenStudent] = React.useState("");
  const [, setCookie] = useCookies([""]);

  const onClickDummyStudent = () => {
    setCookie(
      "token",
      // tokenStudent
      // token adam
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTY4NzIsIm5pcG5ycCI6IjIxMTAxODEwNTQiLCJuYW1hIjoiUml6a3kgQWRhbSBQYW1idWRpIiwiaGFrQWtzZXMiOlsibWFoYXNpc3dhIl0sImlhdCI6MTY0NjcwMzYwMX0.QPv9Lnf-JesnrrBgbUkUckNR3xggiIS2OIxZc_wqqBw"
      // token ahmed
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU3NjIsIm5pcG5ycCI6IjIxMTAxODEwMDIiLCJuYW1hIjoiQWhtYWQgTWF1bGFuYSBKaWhhZCIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NTAxNjY0Mzd9.Zwq37hG_oTt7oOfT8Cq_CQ0CRN3Ko4GbdkHckTX5p-I
      // token nisar
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTYwNTksIm5pcG5ycCI6IjIxMTAxODEwMTMiLCJuYW1hIjoiTXVoIE5pc2FyIFlhbnVhciBVdG9tbyIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDg2OTkyMjd9.NneCStwbrF9mMlNGzKEo1MeguLamaphrueuHehqIqP0"
      // token sherly
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTQ1NTQsIm5pcG5ycCI6IjIxMTAxNzEwMDkiLCJuYW1hIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2Mjk1NDU3NDl9.OdPGnlsjRxZzjnaWK0B_uDpbBI79oPsy-TFfiUgXAvU"
      // token ilham
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiSWxoYW0gRHdpIEt1cm5pYXdhbiIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDM3Njg1MTB9.LdAfxDp6gomlkZL0mOeuKP3yn3zaFoPDj1RBFu1bqSo"
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiSWxoYW0gRHdpIEt1cm5pYXdhbiIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDg2OTc4MDl9.HV3G5ArD14jU8dFlgtEaj072i9LnXNh0p0NCWTcwvPI"
      // token hakim 
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU3MzAsIm5pcG5ycCI6IjIxMTAxODEwMDEiLCJuYW1hIjoiSGFraW0gQWtiYXJ1IFN1bHRob255IiwiaGFrQWtzZXMiOlsibWFoYXNpc3dhIl0sImlhdCI6MTY1MDE3Mzc1OX0._2IpL-R2DPHsigHq3gkkWwhVJkIi8dkF1faXbICIubQ"
      // token goldy
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTYyOTgsIm5pcG5ycCI6IjIxMTAxODEwNTIiLCJuYW1hIjoiR29sZHkgTmFqbWEgQWRsaSBLZXNhdWx5YSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NTAyNTk0ODV9.86r-VxIEDpT9mSqbnBNRpNvZ4BPA9_LWOnOccDav8hE
      // token aji
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTY2MjIsIm5pcG5ycCI6IjIxMTAxODEwMjciLCJuYW1hIjoiTXVoYW1tYWQgU2F0cml5byBBamkiLCJoYWtBa3NlcyI6WyJtYWhhc2lzd2EiXSwiaWF0IjoxNjQ0ODE3NzMyfQ.UrZplDIu2Z_wu9SmIYnPoxbbgRd76qJecvHtmv1bC1I
      // token mas faJar
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MjA2MzMsIm5pcG5ycCI6IjMxMjA2NDAwMjAiLCJuYW1hIjoiTXVoYW1hZCBGYWphciBNdWt0aSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NTcxNjM0MDV9.GKn5wXfeE813h-tkt1VKhnjEjEHy9O2YV3l8F6w3X3k
      // token ghozi
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTYyOTIsIm5pcG5ycCI6IjIxMTAxODEwMjIiLCJuYW1hIjoiTXVoYW1tYWQgR2hvenkgQWwgR2hpZmFyaSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NTcxNjYzMDJ9.NuHVqzJkS3ikKpWC9isjGKNoiP_jnabIfXrdVazcGXA
    );
    history.replace("");
  };

  return (
    <div className="flex flex-col items-center lg:justify-center bg-gray-50 min-h-screen">

      {/* <div className="lg:-mt-20">
        <LogoText className="w-60 h-36" />
      </div>
      <div className="flex items-center w-full">
        <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 w-full">
              <form
                className="w-full"
              >
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                  Login Student
                </h1>
                <div className="block text-gray-700 dark:text-gray-400">
                  <input 
                    type="text" 
                    name="token" 
                    placeholder="Token" 
                    value={tokenStudent} 
                    onChange={(e) => setTokenStudent(e.target.value)} 
                    className={`mt-1 p-2 block w-full focus:outline-none dark:text-gray-200 leading-5 rounded-md focus:border-indigo-400 border border-gray-300 dark:border-blueGray-600 focus:ring focus:ring-indigo-300 dark:focus:border-blueGray-600 dark:focus:ring-blue-600 dark:bg-blueGray-900`}
                  />
                </div> */}

                <div className="flex flex-col justify-center items-center mt-12">
                  <button
                    onClick={onClickDummyStudent}
                    className="bg-blue-600 hover:bg-blue-800 transition text-white py-2 px-4 rounded"
                  >
                    Login as Student
                  </button>
                </div>

              {/* </form>
            </main>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default DummyLogin;
