/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 */

class StudentManager {
  /**
   * Constructor untuk inisialisasi StudentManager
   */
  constructor() {
    this.students = []; // Array untuk menyimpan semua siswa
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   */
  addStudent(student) {
    // Validasi bahwa ID belum digunakan
    const existingStudent = this.findStudent(student.id);
    if (existingStudent) {
      console.log(`Error: ID ${student.id} sudah digunakan!`);
      return false;
    }

    this.students.push(student);
    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   */
  removeStudent(id) {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      console.log(`Error: Siswa dengan ID ${id} tidak ditemukan!`);
      return false;
    }

    this.students.splice(index, 1);
    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   */
  findStudent(id) {
    const student = this.students.find((student) => student.id === id);
    return student || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   */
  updateStudent(id, data) {
    const student = this.findStudent(id);

    if (!student) {
      console.log(`Error: Siswa dengan ID ${id} tidak ditemukan!`);
      return false;
    }

    // Update properti yang ada di data
    if (data.name !== undefined && data.name.trim() !== '') {
      student.name = data.name;
    }

    if (data.class !== undefined && data.class.trim() !== '') {
      student.class = data.class;
    }

    return true;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   */
  getTopStudents(n) {
    // Sort siswa berdasarkan rata-rata (descending)
    const sortedStudents = [...this.students].sort((a, b) => {
      return b.getAverage() - a.getAverage();
    });

    // Ambil n teratas
    return sortedStudents.slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   */
  displayAllStudents() {
    if (this.students.length === 0) {
      console.log('\nBelum ada siswa yang terdaftar.');
      return;
    }

    console.log('\n=== DAFTAR SISWA ===');
    this.students.forEach((student) => {
      student.displayInfo();
    });
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    return this.students.filter((student) => student.class === className);
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    const classStudents = this.getStudentsByClass(className);

    if (classStudents.length === 0) {
      return {
        className: className,
        totalStudents: 0,
        averageScore: 0,
        passedStudents: 0,
        failedStudents: 0,
      };
    }

    const totalAverage = classStudents.reduce((sum, student) => {
      return sum + student.getAverage();
    }, 0);

    const passedStudents = classStudents.filter((student) => {
      return student.getGradeStatus() === 'Lulus';
    }).length;

    return {
      className: className,
      totalStudents: classStudents.length,
      averageScore: parseFloat(
        (totalAverage / classStudents.length).toFixed(2)
      ),
      passedStudents: passedStudents,
      failedStudents: classStudents.length - passedStudents,
    };
  }
}

export default StudentManager;
