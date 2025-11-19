/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  try {
    // Minta input dari user
    const id = readlineSync.question('Masukkan ID siswa: ');
    const name = readlineSync.question('Masukkan nama siswa: ');
    const studentClass = readlineSync.question(
      'Masukkan kelas siswa (misal: 10A): '
    );

    // Validasi input tidak kosong
    if (!id.trim() || !name.trim() || !studentClass.trim()) {
      console.log('Error: Semua field harus diisi!');
      return;
    }

    // Buat object Student baru
    const student = new Student(id, name, studentClass);

    // Tambahkan ke manager
    if (manager.addStudent(student)) {
      console.log(`\nSiswa ${name} berhasil ditambahkan!`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

/**
 * Handler untuk melihat semua siswa
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);

  if (student) {
    student.displayInfo();
  } else {
    console.log(`Siswa dengan ID ${id} tidak ditemukan.`);
  }
}

/**
 * Handler untuk update data siswa
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa yang akan diupdate: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Tampilkan data saat ini
  console.log('\nData saat ini:');
  student.displayInfo();

  // Minta input data baru
  console.log('\nMasukkan data baru (tekan Enter untuk skip):');
  const newName = readlineSync.question(`Nama baru [${student.name}]: `);
  const newClass = readlineSync.question(`Kelas baru [${student.class}]: `);

  // Siapkan data untuk update
  const updateData = {};
  if (newName.trim()) updateData.name = newName;
  if (newClass.trim()) updateData.class = newClass;

  // Update data
  if (Object.keys(updateData).length > 0) {
    if (manager.updateStudent(id, updateData)) {
      console.log('\nData siswa berhasil diupdate!');
      student.displayInfo();
    }
  } else {
    console.log('\nTidak ada data yang diupdate.');
  }
}

/**
 * Handler untuk menghapus siswa
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Tampilkan data siswa
  student.displayInfo();

  // Konfirmasi penghapusan
  const confirm = readlineSync.question(
    '\nApakah Anda yakin ingin menghapus siswa ini? (y/n): '
  );

  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    if (manager.removeStudent(id)) {
      console.log('\nSiswa berhasil dihapus!');
    }
  } else {
    console.log('\nPenghapusan dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Tampilkan data siswa
  student.displayInfo();

  try {
    // Minta input mata pelajaran dan nilai
    const subject = readlineSync.question('\nMasukkan nama mata pelajaran: ');
    const scoreInput = readlineSync.question('Masukkan nilai (0-100): ');
    const score = parseFloat(scoreInput);

    // Tambahkan nilai
    student.addGrade(subject, score);
    console.log(`\nNilai ${subject} berhasil ditambahkan!`);

    // Tampilkan info terbaru
    student.displayInfo();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

/**
 * Handler untuk melihat top students
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('\nBelum ada siswa yang terdaftar.');
    return;
  }

  console.log('\nSiswa dengan rata-rata nilai tertinggi:');
  topStudents.forEach((student, index) => {
    console.log(`\n${index + 1}. ${student.name} (ID: ${student.id})`);
    console.log(`   Kelas: ${student.class}`);
    console.log(`   Rata-rata: ${student.getAverage()}`);
    console.log(`   Status: ${student.getGradeStatus()}`);
  });
}

/**
 * Main program loop
 */
function main() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  Selamat datang di Sistem Manajemen       ║');
  console.log('║         Nilai Siswa!                       ║');
  console.log('╚════════════════════════════════════════════╝');

  let running = true;

  while (running) {
    displayMenu();

    const choice = readlineSync.question('\nPilih menu (1-8): ');

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        console.log('\nTerima kasih telah menggunakan aplikasi ini!');
        console.log('Sampai jumpa! 👋\n');
        break;
      default:
        console.log('\nPilihan tidak valid! Silakan pilih menu 1-8.');
    }

    // Pause sebelum menampilkan menu lagi (kecuali jika keluar)
    if (running && choice !== '8') {
      readlineSync.question('\nTekan Enter untuk melanjutkan...');
    }
  }
}

// Jalankan aplikasi
main();
