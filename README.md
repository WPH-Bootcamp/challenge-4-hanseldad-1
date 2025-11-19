# Challenge 4: Sistem Manajemen Nilai Siswa

## Deskripsi

Aplikasi CLI (Command Line Interface) untuk sistem manajemen nilai siswa menggunakan JavaScript dengan pendekatan Object-Oriented Programming (OOP).

## Fitur yang Diimplementasikan

### ✅ Class Student

Class `Student` dengan properti dan method lengkap:

- **Properti:**

  - `id` - ID unik siswa
  - `name` - Nama siswa
  - `class` - Kelas siswa (misal: "10A", "11B")
  - `grades` - Object berisi nilai mata pelajaran

- **Method:**
  - `addGrade(subject, score)` - Menambah/update nilai mata pelajaran dengan validasi (0-100)
  - `getAverage()` - Menghitung rata-rata nilai
  - `getGradeStatus()` - Menentukan status (Lulus >= 75, Tidak Lulus < 75)
  - `displayInfo()` - Menampilkan informasi lengkap siswa

### ✅ Class StudentManager

Class `StudentManager` untuk mengelola data siswa:

- `addStudent(student)` - Menambah siswa baru dengan validasi ID unik
- `removeStudent(id)` - Menghapus siswa berdasarkan ID
- `findStudent(id)` - Mencari siswa berdasarkan ID
- `updateStudent(id, data)` - Update data siswa (nama, kelas)
- `getAllStudents()` - Mendapatkan semua data siswa
- `getTopStudents(n)` - Mendapatkan n siswa dengan rata-rata tertinggi
- `displayAllStudents()` - Menampilkan semua siswa
- **BONUS:** `getStudentsByClass(className)` - Filter siswa berdasarkan kelas
- **BONUS:** `getClassStatistics(className)` - Statistik kelas

### ✅ CLI Interface

Menu interaktif dengan 8 pilihan:

1. **Tambah Siswa Baru** - Input ID, nama, dan kelas
2. **Lihat Semua Siswa** - Menampilkan daftar lengkap siswa
3. **Cari Siswa** - Mencari siswa berdasarkan ID
4. **Update Data Siswa** - Mengubah nama atau kelas siswa
5. **Hapus Siswa** - Menghapus siswa dengan konfirmasi
6. **Tambah Nilai Siswa** - Menambah nilai mata pelajaran
7. **Lihat Top 3 Siswa** - Menampilkan 3 siswa terbaik
8. **Keluar** - Keluar dari aplikasi

## Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Aplikasi

```bash
npm start
```

atau

```bash
node index.js
```

## Contoh Penggunaan

### Menambah Siswa Baru

```
Pilih menu (1-8): 1

--- Tambah Siswa Baru ---
Masukkan ID siswa: S001
Masukkan nama siswa: Budi Santoso
Masukkan kelas siswa (misal: 10A): 10A

Siswa Budi Santoso berhasil ditambahkan!
```

### Menambah Nilai Siswa

```
Pilih menu (1-8): 6

--- Tambah Nilai Siswa ---
Masukkan ID siswa: S001

------------------------
ID: S001
Nama: Budi Santoso
Kelas: 10A
Belum ada nilai
------------------------

Masukkan nama mata pelajaran: Matematika
Masukkan nilai (0-100): 85

Nilai Matematika berhasil ditambahkan!

------------------------
ID: S001
Nama: Budi Santoso
Kelas: 10A
Mata Pelajaran:
  - Matematika: 85
Rata-rata: 85
Status: Lulus
------------------------
```

### Melihat Semua Siswa

```
Pilih menu (1-8): 2

--- Daftar Semua Siswa ---

=== DAFTAR SISWA ===

------------------------
ID: S001
Nama: Budi Santoso
Kelas: 10A
Mata Pelajaran:
  - Matematika: 85
  - Bahasa Indonesia: 90
  - IPA: 88
Rata-rata: 87.67
Status: Lulus
------------------------
```

### Melihat Top 3 Siswa

```
Pilih menu (1-8): 7

--- Top 3 Siswa ---

Siswa dengan rata-rata nilai tertinggi:

1. Budi Santoso (ID: S001)
   Kelas: 10A
   Rata-rata: 87.67
   Status: Lulus

2. Siti Nurhaliza (ID: S002)
   Kelas: 10B
   Rata-rata: 85.5
   Status: Lulus

3. Ahmad Dahlan (ID: S003)
   Kelas: 10A
   Rata-rata: 78.33
   Status: Lulus
```

## Struktur Project

```
challenge-4-hanseldad-1/
├── src/
│   ├── Student.js          # Class Student
│   └── StudentManager.js   # Class StudentManager
├── index.js                # Main CLI application
├── package.json            # Dependencies
├── .gitignore             # Git ignore file
└── README.md              # Dokumentasi
```

## Fitur Validasi

### Input Validation

- ✅ ID siswa harus unik
- ✅ Nama tidak boleh kosong
- ✅ Kelas tidak boleh kosong
- ✅ Nilai harus berupa angka
- ✅ Nilai harus dalam rentang 0-100
- ✅ Mata pelajaran tidak boleh kosong

### Error Handling

- ✅ Siswa tidak ditemukan
- ✅ ID duplikat
- ✅ Input tidak valid
- ✅ Pesan error yang informatif

## Kriteria Kelulusan

- **Lulus:** Rata-rata nilai >= 75
- **Tidak Lulus:** Rata-rata nilai < 75

## Teknologi yang Digunakan

- **Node.js** - Runtime environment
- **ES6 Modules** - Import/Export syntax
- **readline-sync** - Library untuk input CLI
- **OOP JavaScript** - Class, Constructor, Methods

## Fitur Bonus yang Diimplementasikan

- ✅ Method `getStudentsByClass()` - Filter siswa berdasarkan kelas
- ✅ Method `getClassStatistics()` - Statistik kelas (jumlah siswa, rata-rata, lulus/tidak lulus)
- ✅ Konfirmasi sebelum menghapus siswa
- ✅ UI yang lebih menarik dengan border dan formatting
- ✅ Validasi input yang komprehensif
- ✅ Error handling yang baik

## Cara Testing Manual

1. **Test Tambah Siswa:**

   - Tambah beberapa siswa dengan ID berbeda
   - Coba tambah siswa dengan ID yang sama (harus error)

2. **Test Tambah Nilai:**

   - Tambah nilai untuk siswa
   - Coba input nilai di luar range 0-100 (harus error)
   - Tambah beberapa mata pelajaran

3. **Test Update:**

   - Update nama atau kelas siswa
   - Verifikasi perubahan dengan menu "Cari Siswa"

4. **Test Hapus:**

   - Hapus siswa
   - Verifikasi siswa sudah tidak ada

5. **Test Top Students:**
   - Tambah beberapa siswa dengan nilai berbeda
   - Lihat top 3 siswa (harus terurut dari tertinggi)

## Author

Sistem Manajemen Nilai Siswa - Challenge 4

## License

ISC

---

**Happy Coding!** 🚀
