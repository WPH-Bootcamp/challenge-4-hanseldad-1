/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  /**
   * Constructor untuk membuat instance Student
   * @param {string|number} id - ID unik siswa
   * @param {string} name - Nama siswa
   * @param {string} studentClass - Kelas siswa (misal: "10A", "11B")
   */
  constructor(id, name, studentClass) {
    if (!id || !name || !studentClass) {
      throw new Error('ID, nama, dan kelas harus diisi!');
    }

    this.id = id;
    this.name = name;
    this.class = studentClass;
    this.grades = {}; // Object untuk menyimpan nilai {subject: score}
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * @throws {Error} Jika nilai tidak valid
   */
  addGrade(subject, score) {
    // Validasi input
    if (!subject || subject.trim() === '') {
      throw new Error('Nama mata pelajaran tidak boleh kosong!');
    }

    if (typeof score !== 'number' || isNaN(score)) {
      throw new Error('Nilai harus berupa angka!');
    }

    if (score < 0 || score > 100) {
      throw new Error('Nilai harus antara 0-100!');
    }

    // Tambahkan atau update nilai
    this.grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai (0 jika belum ada nilai)
   */
  getAverage() {
    const subjects = Object.keys(this.grades);

    // Jika belum ada nilai, return 0
    if (subjects.length === 0) {
      return 0;
    }

    // Hitung total nilai
    const total = subjects.reduce((sum, subject) => {
      return sum + this.grades[subject];
    }, 0);

    // Return rata-rata dengan 2 desimal
    return parseFloat((total / subjects.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   */
  getGradeStatus() {
    const average = this.getAverage();
    return average >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   */
  displayInfo() {
    console.log('\n------------------------');
    console.log(`ID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.class}`);

    // Tampilkan mata pelajaran dan nilai
    const subjects = Object.keys(this.grades);
    if (subjects.length > 0) {
      console.log('Mata Pelajaran:');
      subjects.forEach((subject) => {
        console.log(`  - ${subject}: ${this.grades[subject]}`);
      });
      console.log(`Rata-rata: ${this.getAverage()}`);
      console.log(`Status: ${this.getGradeStatus()}`);
    } else {
      console.log('Belum ada nilai');
    }
    console.log('------------------------');
  }
}

export default Student;
