// ในไฟล์ register.js
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
    // ... โค้ดอื่น ๆ

    /// ลงทะเบียน
    const registerButton = document.getElementById("register");
    registerButton.addEventListener("click", async () => {
        const username = document.getElementById("username1").value;
        const password = document.getElementById("password1").value;
        const fullname = document.getElementById("fullname").value;
        const room = document.getElementById("room").value;
        const number = document.getElementById("number").value;
        const major = document.getElementById("major").value;
        const studentid = document.getElementById("studentid").value;

        // ตรวจสอบความถูกต้องของข้อมูล
        if (!username || !password || !fullname || !room || !number || !major || !studentid) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        try {
            // ลงทะเบียนผู้ใช้
            const userCredential = await createUserWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;

            // เพิ่มข้อมูลลงใน Firestore database
            await setDoc(doc(db, "users", user.uid), {
                fullname: fullname,
                room: room,
                number: number,
                email: username,
                studentid: studentid,
                major: major
            });

            alert("ลงทะเบียนผู้ใช้เรียบร้อยแล้ว!");
            window.location.href = "media1.html";
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error.message);
            alert("เกิดข้อผิดพลาดในการลงทะเบียน: " + error.message);
        }
    });
});
