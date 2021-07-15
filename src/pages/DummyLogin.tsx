import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
export const DummyLogin = () => {
  const history = useHistory();
  const [, setCookie] = useCookies(["vlabToken"]);

  const onClickDummyStudent = () => {
    localStorage.setItem(
      "userCas",
      `{"email":"sherlymaya@it.student.pens.ac.id","nip":null,"nrp":"2110171009"}`
    );
    setCookie(
      "user",
      {
        id: 14554,
        nrp: "2110171009",
        name: "Sherly Maya Salsabilla",
        kelas: 4,
        program: "D4",
        jurusan: "Teknik Informatika",
        image: "https://ethol.pens.ac.id/api/images/user.png",
        role: 2,
        chat_id: "5e93bf7e159747618add175c",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ1NTQsIm5ycCI6IjIxMTAxNzEwMDkiLCJuYW1lIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImtlbGFzIjo0LCJwcm9ncmFtIjoiRDQiLCJqdXJ1c2FuIjoiVGVrbmlrIEluZm9ybWF0aWthIiwiaW1hZ2UiOiJodHRwczovL2V0aG9sLnBlbnMuYWMuaWQvYXBpL2ltYWdlcy91c2VyLnBuZyIsInJvbGUiOjIsImNoYXRfaWQiOiI1ZTkzYmY3ZTE1OTc0NzYxOGFkZDE3NWMiLCJpYXQiOjE2MjI1MjY3NTV9.jcjKW3ngCACQFXSw4_A7CUrWBN0gA15lZ-puFMIosGI",
      },
      {
        domain:
          process.env.REACT_APP_ENV === "DEV"
            ? process.env.REACT_APP_DOMAIN
            : "ethol.pens.ac.id",
        path: "/",
      }
    );
    history.replace("/vlab");
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
