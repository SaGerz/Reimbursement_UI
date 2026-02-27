# 💰 Reimbursement Management System (UI)

Frontend (UI) untuk sistem **Reimbursement Management** dengan multi-role workflow.  
Project ini berfokus pada pembuatan antarmuka pengguna untuk mempermudah proses pengajuan, persetujuan, dan pembayaran reimbursement di dalam perusahaan.

API backend sudah tersedia, dan UI saat ini sedang dalam tahap pengembangan.

---

## 🎯 Project Overview

Sistem ini memiliki **3 role utama** dengan alur proses sebagai berikut:

1. **Employee** mengajukan reimbursement  
2. **Manager** melakukan approve / reject  
3. **Finance** memproses pembayaran  

**Workflow:**

Employee → Submit Request → Manager Approval → Finance Payment → Completed

---

## 👥 User Roles & Responsibilities

### 👨‍💼 Employee
- Mengajukan reimbursement
- Melihat status pengajuan
- Melihat detail approval & catatan

### 👨‍💼 Manager
- Menyetujui atau menolak reimbursement
- Melihat riwayat persetujuan

### 👩‍💼 Finance
- Memproses pembayaran reimbursement
- Mengunggah bukti pembayaran
- Membuat laporan pengeluaran

---

## 🧭 Application Pages (V1)

### 🧑‍💻 Employee Pages

| Page | Description |
|------|------------|
| 🏠 Dashboard | Ringkasan status reimbursement (pending, approved, rejected) |
| ➕ Submit Reimbursement | Form pengajuan baru (upload bukti, nominal, kategori) |
| 📋 My Reimbursements | Daftar semua reimbursement yang diajukan |
| 📑 Detail Reimbursement | Detail status + catatan dari manager & finance |

---

### 💰 Finance Pages

| Page | Description |
|------|------------|
| 🏠 Dashboard | Summary pengeluaran bulan ini & request yang sudah dibayar |
| 💸 Payment Queue | Daftar reimbursement yang siap dibayar |
| 📤 Upload Proof | Upload bukti pembayaran (transfer slip, invoice, dll) |
| 📊 Reports | Laporan reimbursement per karyawan/divisi/bulan |

---

### 🧑‍💼 Manager Pages

| Page | Description |
|------|------------|
| 🏠 Dashboard | Summary request (pending, approved, rejected) |
| ✅ Pending Approvals | List reimbursement menunggu persetujuan |
| 📋 History | Riwayat approval/rejection |
| 📑 Detail | Detail reimbursement + approve/reject action |

---

## 🚧 Development Status

| Module | Status |
|--------|--------|
| Employee | ✅ Completed (Dashboard in progress) |
| Finance | 🔄 In Development |
| Manager | ⏳ Not started |

---

## 🔌 Backend API

UI ini terhubung dengan REST API yang telah tersedia untuk:

- Authentication & Authorization
- Reimbursement submission
- Approval workflow
- Payment processing
- Reporting

---

## 🛠 Tech Stack

*(Edit sesuai stack yang digunakan)*

- React.js
- Tailwind CSS
- Axios / Fetch API
- JWT Authentication

---

## 🚀 Current Focus

Saat ini pengembangan difokuskan pada:

✔ Finance Payment Workflow  
✔ Penyempurnaan Employee Dashboard  
✔ Integrasi API & state management  

---

## 📌 Version

**V1 Scope:**
- Multi-role reimbursement workflow
- Approval & payment flow
- Basic finance reporting