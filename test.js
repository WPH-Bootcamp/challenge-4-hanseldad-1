/**
 * Test Script - Manual Testing untuk Student Management System
 * File ini untuk testing manual tanpa interaksi CLI
 */

import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

console.log('='.repeat(50));
console.log('TESTING STUDENT MANAGEMENT SYSTEM');
console.log('='.repeat(50));

// Inisialisasi StudentManager
const manager = new StudentManager();

console.log('\n1. Testing Student Class - Constructor');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  console.log('✓ Student created successfully');
  console.log(
    `  ID: ${student1.id}, Name: ${student1.name}, Class: ${student1.class}`
  );
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n2. Testing addGrade() Method');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  student1.addGrade('Matematika', 85);
  student1.addGrade('Bahasa Indonesia', 90);
  student1.addGrade('IPA', 88);
  console.log('✓ Grades added successfully');
  console.log(`  Grades:`, student1.grades);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n3. Testing getAverage() Method');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  student1.addGrade('Matematika', 85);
  student1.addGrade('Bahasa Indonesia', 90);
  student1.addGrade('IPA', 88);
  const average = student1.getAverage();
  console.log('✓ Average calculated successfully');
  console.log(`  Average: ${average} (Expected: 87.67)`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n4. Testing getGradeStatus() Method');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  student1.addGrade('Matematika', 85);
  student1.addGrade('Bahasa Indonesia', 90);
  const status1 = student1.getGradeStatus();
  console.log(`✓ Student with average ${student1.getAverage()}: ${status1}`);

  const student2 = new Student('S002', 'Ahmad', '10B');
  student2.addGrade('Matematika', 60);
  student2.addGrade('Bahasa Indonesia', 65);
  const status2 = student2.getGradeStatus();
  console.log(`✓ Student with average ${student2.getAverage()}: ${status2}`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n5. Testing displayInfo() Method');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  student1.addGrade('Matematika', 85);
  student1.addGrade('Bahasa Indonesia', 90);
  student1.addGrade('IPA', 88);
  console.log('✓ Displaying student info:');
  student1.displayInfo();
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n6. Testing addStudent() Method');
console.log('-'.repeat(50));
try {
  const student1 = new Student('S001', 'Budi Santoso', '10A');
  const student2 = new Student('S002', 'Siti Nurhaliza', '10B');

  const result1 = manager.addStudent(student1);
  const result2 = manager.addStudent(student2);
  console.log(`✓ Student 1 added: ${result1}`);
  console.log(`✓ Student 2 added: ${result2}`);
  console.log(`  Total students: ${manager.getAllStudents().length}`);

  // Test duplicate ID
  const student3 = new Student('S001', 'Duplicate', '10C');
  const result3 = manager.addStudent(student3);
  console.log(`✓ Duplicate ID rejected: ${!result3}`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n7. Testing findStudent() Method');
console.log('-'.repeat(50));
try {
  const found = manager.findStudent('S001');
  if (found) {
    console.log(`✓ Student found: ${found.name}`);
  }

  const notFound = manager.findStudent('S999');
  console.log(
    `✓ Non-existent student: ${notFound === null ? 'null' : 'found'}`
  );
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n8. Testing updateStudent() Method');
console.log('-'.repeat(50));
try {
  const result = manager.updateStudent('S001', {
    name: 'Budi Santoso Updated',
    class: '11A',
  });
  console.log(`✓ Student updated: ${result}`);

  const student = manager.findStudent('S001');
  console.log(`  New name: ${student.name}`);
  console.log(`  New class: ${student.class}`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n9. Testing getTopStudents() Method');
console.log('-'.repeat(50));
try {
  // Add more students with grades
  const student3 = new Student('S003', 'Ahmad Dahlan', '10A');
  student3.addGrade('Matematika', 75);
  student3.addGrade('IPA', 80);
  student3.addGrade('Bahasa Indonesia', 82);
  manager.addStudent(student3);

  const student4 = new Student('S004', 'Dewi Sartika', '10B');
  student4.addGrade('Matematika', 95);
  student4.addGrade('IPA', 92);
  student4.addGrade('Bahasa Indonesia', 88);
  manager.addStudent(student4);

  // Add grades to existing students
  manager.findStudent('S001').addGrade('Matematika', 85);
  manager.findStudent('S001').addGrade('IPA', 88);
  manager.findStudent('S002').addGrade('Matematika', 90);
  manager.findStudent('S002').addGrade('IPA', 85);

  const topStudents = manager.getTopStudents(3);
  console.log('✓ Top 3 students:');
  topStudents.forEach((student, index) => {
    console.log(
      `  ${index + 1}. ${student.name} - Average: ${student.getAverage()}`
    );
  });
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n10. Testing displayAllStudents() Method');
console.log('-'.repeat(50));
try {
  console.log('✓ Displaying all students:');
  manager.displayAllStudents();
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n11. Testing removeStudent() Method');
console.log('-'.repeat(50));
try {
  const beforeCount = manager.getAllStudents().length;
  const result = manager.removeStudent('S003');
  const afterCount = manager.getAllStudents().length;

  console.log(`✓ Student removed: ${result}`);
  console.log(`  Students before: ${beforeCount}, after: ${afterCount}`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n12. Testing Input Validation');
console.log('-'.repeat(50));
try {
  const student = new Student('S005', 'Test Student', '10C');

  // Test invalid score (> 100)
  try {
    student.addGrade('Math', 150);
    console.log('✗ Should reject score > 100');
  } catch (error) {
    console.log('✓ Rejected score > 100:', error.message);
  }

  // Test invalid score (< 0)
  try {
    student.addGrade('Math', -10);
    console.log('✗ Should reject score < 0');
  } catch (error) {
    console.log('✓ Rejected score < 0:', error.message);
  }

  // Test empty subject
  try {
    student.addGrade('', 80);
    console.log('✗ Should reject empty subject');
  } catch (error) {
    console.log('✓ Rejected empty subject:', error.message);
  }
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n13. BONUS: Testing getStudentsByClass() Method');
console.log('-'.repeat(50));
try {
  const class10A = manager.getStudentsByClass('10A');
  console.log(`✓ Students in class 10A: ${class10A.length}`);
  class10A.forEach((student) => {
    console.log(`  - ${student.name}`);
  });
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n14. BONUS: Testing getClassStatistics() Method');
console.log('-'.repeat(50));
try {
  const stats = manager.getClassStatistics('10A');
  console.log('✓ Class 10A Statistics:');
  console.log(`  Total Students: ${stats.totalStudents}`);
  console.log(`  Average Score: ${stats.averageScore}`);
  console.log(`  Passed: ${stats.passedStudents}`);
  console.log(`  Failed: ${stats.failedStudents}`);
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('ALL TESTS COMPLETED!');
console.log('='.repeat(50));
console.log('\nTo run the interactive CLI, use: npm start');
console.log('or: node index.js\n');
