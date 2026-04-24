import { getAllUsers } from "./firebaseConfig.js";

// เรียกใช้ getAllUsers เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
getAllUsers().then(users => {
  // แสดงผลใน console สำหรับตรวจสอบ
  console.log("All users:", users);

  // ทำการแสดงผลข้อมูลในที่นี้, คุณสามารถปรับแต่งตามที่คุณต้องการ
  const userCardListElement = document.getElementById("userCardList");
  if (userCardListElement) {
    users.forEach(user => {
      // สร้าง HTML สำหรับการ์ดผู้ใช้
      const cardHtml = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${user.data.fullname}</h5>
              <p class="card-text">Email: ${user.data.email}</p>
              <p class="card-text">Major: ${user.data.major}</p>
              <p class="card-text">Number: ${user.data.number}</p>
              <p class="card-text">Room: ${user.data.room}</p>
              <p class="card-text">Student ID: ${user.data.studentid}</p>
              <!-- สามารถเพิ่มข้อมูลเพิ่มเติมตามที่คุณต้องการ -->
            </div>
          </div>
        </div>
      `;

      // เพิ่มการ์ดผู้ใช้ลงในรายการ
      userCardListElement.innerHTML += cardHtml;
    });
  }
});
