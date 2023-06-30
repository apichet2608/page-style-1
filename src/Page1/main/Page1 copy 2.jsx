import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await fetch(
            "http://127.0.0.1:3000/protected-route/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            setTokenValid(true);
            console.log(data.status);
            navigate("/page/2");
          } else {
            setTokenValid(false);
            navigate("/page/1");
          }
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบโทเค็น:", error);
        setTokenValid(false);
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    setUserData(location.state?.userData);
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/page/1");
  };

  return (
    <div>
      <h2>TEST</h2>
      <button onClick={handleLogout}>ออกจากระบบ</button>
      {tokenValid ? (
        <div>
          <p>โทเค็นถูกต้องและไม่หมดอายุ</p>
          {userData && (
            <div>
              <h3>ข้อมูลผู้ใช้</h3>
              <p>ชื่อผู้ใช้: {userData.username}</p>
              <p>อีเมล์: {userData.email}</p>
              {/* แสดงรายละเอียดเพิ่มเติมของผู้ใช้ */}
              {/* ... */}
            </div>
          )}
        </div>
      ) : (
        <p>โทเค็นไม่ถูกต้องหรือหมดอายุ</p>
      )}
    </div>
  );
}

export default App;
