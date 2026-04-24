import { getFirestore, collection, query, where, getDocs,updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { db } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // ให้ user ที่ login เข้ามา
        const user = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
                resolve(user);
                unsubscribe();
            });
        });

        // ตรวจสอบว่ามี user หรือไม่
        if (user) {
            // ดึงข้อมูลจาก Firestore โดยใช้ email ของ user เป็นเงื่อนไข
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            // นำข้อมูลที่ได้มาแสดงผลใน Card
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                // นำข้อมูลไปแสดงผลใน Card
                document.getElementById("username").textContent = `ชื่อผู้ใช้: ${data.fullname}`;
                document.getElementById("room").textContent = `ชั้น: ${data.room}`;
                document.getElementById("number").textContent = `เลขที่: ${data.number}`;
                document.getElementById("studentid").textContent = `รหัสนักศึกษา: ${data.studentid}`;
                document.getElementById("major").textContent = `สาขาวิชา: ${data.major}`;
            });
        } else {
            console.log("User is not logged in.");
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error.message);
    }

    // เพิ่มโค้ด JavaScript ที่เกี่ยวกับการแก้ไขข้อมูลที่นี่
    const editProfileButton = document.getElementById("editProfileButton");
    const editProfileCard = document.getElementById("editProfileCard");
    const saveChangesBtn = document.getElementById("saveChangesBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const confirmationModal = document.getElementById("confirmationModal");
    const confirmSaveChangesBtn = document.getElementById("confirmSaveChangesBtn");

    // ตรวจสอบว่ามีการคลิกที่ปุ่ม "แก้ไขข้อมูล" หรือไม่
    editProfileButton.addEventListener("click", function () {
        // แสดงส่วนที่สามารถแก้ไข
        editProfileCard.style.display = "block";
    });

    // ตรวจสอบว่ามีการคลิกที่ปุ่ม "ยกเลิก" หรือไม่
    cancelEditBtn.addEventListener("click", function () {
        // ซ่อนส่วนที่สามารถแก้ไข
        editProfileCard.style.display = "none";
    });

    // ตรวจสอบว่ามีการคลิกที่ปุ่ม "บันทึกการเปลี่ยนแปลง" หรือไม่
    saveChangesBtn.addEventListener("click", function () {
        // แสดง popup ถามความแน่ใจ
        confirmationModal.style.display = "block";
    });

    confirmSaveChangesBtn.addEventListener("click", async function () {
        try {
            // นำข้อมูลใหม่จาก input fields
            const newUsername = document.getElementById("newUsername").value;
            const newRoom = document.getElementById("newRoom").value;
            const newNumber = document.getElementById("newNumber").value;
            const newMajor = document.getElementById("newMajor").value;
            const newStudentid = document.getElementById("newStudentid").value;
    
            // นำข้อมูลใหม่ไปอัปเดตใน Firestore
            const user = await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
                    resolve(user);
                    unsubscribe();
                });
            });
    
            if (user) {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
    
                querySnapshot.forEach(async (doc) => {
                    const userId = doc.id;
    
                    await updateDoc(doc.ref, {
                        fullname: newUsername,
                        room: newRoom,
                        number: newNumber,
                        major: newMajor,
                        studentid: newStudentid
                    });
    
                    // ซ่อนส่วนที่สามารถแก้ไข
                    editProfileCard.style.display = "none";
    
                    // ซ่อน popup ถามความแน่ใจ
                    confirmationModal.style.display = "none";
                });
            } else {
                console.log("User is not logged in.");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการบันทึกการเปลี่ยนแปลง:", error.message);
        }
    });
    
});
