
# SEKAWAN PERMINTAAN KENDARAAN

Aplikasi Pemesanan Kendaraan

## Demo Aplikasi
https://admin-sekawan.vercel.app

## Git
https://github.com/ardipc/admin-sekawan

## Screenshot
![Dashboard](https://admin-sekawan.vercel.app/images/dashboard.png)
![Login](https://admin-sekawan.vercel.app/images/login.png)
![Request](https://admin-sekawan.vercel.app/images/request.png)

## Users
| email                  | password   | role   |
|------------------------|------------|--------|
| admin.1@sekawan.id     | admin123   | admin  |
| admin.2@sekawan.id     | admin123   | admin  |
| driver.1@sekawan.id    | driver123  | driver |
| driver.2@sekawan.id    | driver123  | driver |
| driver.3@sekawan.id    | driver123  | driver |
| driver.4@sekawan.id    | driver123  | driver |
| manager.1@sekawan.id   | manager123 | admin  |
| manager.2@sekawan.id   | manager123 | admin  |
| manager.1.1@sekawan.id | manager123 | admin  |
| manager.3@sekawan.id   | manager123 | admin  |
| manager.3.1@sekawan.id | manager123 | admin  |


## ERD

![App Screenshot](https://admin-sekawan.vercel.app/images/erd.png)


## Fitur
### Role Admin
1. Request kendaraan dan driver
2. Manage kendaraan
3. Manage user
4. Log request

### Role Driver
1. Input history BBM
2. Input history pemakaian
3. Input history service

### Role Manager
1. Approve/Reject request
2. Detail request 

## Workflow
1. User admin membuat request kendaraan dengan memilih kendaraan dan drivernya
2. User admin memilih approvalnya, apabila manager mempunyai manager lagi diatasnya akan secara otomatis ditampilkan
3. User manager melihat request yang membutuhkan aksi approval berdasarkan emailnya
4. User admin melihat kembali request yang telah di approve/reject

## Tech Stack

**Client:** Next.js, React, TailwindCSS, Supabase

**Server:** Node, Express

**Database:** PostgreSQL

