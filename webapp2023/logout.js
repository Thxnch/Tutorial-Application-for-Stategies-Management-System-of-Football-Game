import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", async () => {
        // ใช้ window.confirm เพื่อสร้าง popup ถามยืนยัน
        const confirmLogout = window.confirm("คุณต้องการออกจากระบบหรือไม่?");
        
        if (confirmLogout) {
            try {
                await signOut(auth);
                console.log("ออกจากระบบสำเร็จ!");

                // ทำการเปลี่ยนหน้าไปยังหน้าเข้าสู่ระบบหรือหน้าอื่น ๆ ตามที่คุณต้องการ
                window.location.href = "register.html";
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการออกจากระบบ:", error.message);
                alert("เกิดข้อผิดพลาดในการออกจากระบบ");
            }
        }
    });
});
