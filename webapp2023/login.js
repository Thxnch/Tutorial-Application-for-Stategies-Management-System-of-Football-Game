// ในไฟล์ login.js
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

// เพิ่มตัวฟังเหตุการณ์ click ลงในปุ่มเข้าสู่ระบบ
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    // ดึงค่าชื่อผู้ใช้และรหัสผ่านจากอินพุต
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ใช้ signInWithEmailAndPassword เพื่อเข้าสู่ระบบ
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // เข้าสู่ระบบสำเร็จ

            // ตรวจสอบว่า username คือ atcadmin@gmail.com หรือไม่
            if (username === "atcadmin@gmail.com") {
                // ถ้าใช่, เปลี่ยนเส้นทาง URL ไปยัง dataadmin.html
                window.location.href = "dataadmin.html";
            } else {
                // ถ้าไม่, เปลี่ยนเส้นทาง URL ไปยัง media1.html หรือหน้าที่ต้องการ
                window.location.href = "media1.html";
            }
        })
        .catch((error) => {
            // เข้าสู่ระบบไม่สำเร็จ
            alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ");
        });
});
