// ในไฟล์ firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoJhZIDh7UYwnehvn6XiE13e1LG-dig14",
  authDomain: "webapptactics.firebaseapp.com",
  databaseURL: "https://webapptactics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webapptactics",
  storageBucket: "webapptactics.appspot.com",
  messagingSenderId: "390440752219",
  appId: "1:390440752219:web:1316e62e6eba2457d7db7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);
// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
const getAllUsers = async () => {
  const usersCollection = collection(db, 'users'); // เปลี่ยน 'users' เป็นชื่อคอลเล็กชันของคุณ
  const usersSnapshot = await getDocs(usersCollection);
  const users = [];

  usersSnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      data: doc.data()
    });
  });

  return users;
};

export { db, auth, getAllUsers };