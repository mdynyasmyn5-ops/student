// ==========================================
// نظام إدارة وتحليل نتائج الطلاب (Console-Based)
// ==========================================

// 1. هيكلة بيانات الطالب (Class & Create repository)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // 2. دوال التحليل الأكاديمي (Methods)

  // دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  // دالة التقدير باستخدام شروط if/else
  getGrade(average) {
    if (average >= 85) return 'A';
    if (average >= 75) return 'B';
    if (average >= 65) return 'C';
    if (average >= 50) return 'D';
    if (average >= 40) return 'E';
    return 'F';
  }

  // دالة النتيجة النهائية (المتوسط >= 50 و الحضور >= 75)
  getResult(average) {
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(1, "أحمد محمد", [85, 90, 88], 85),
  new Student(2, "فاطمة علي", [42, 45, 43], 80), // طالب متعثر (المتوسط: 43.33)
  new Student(3, "محمود حسن", [65, 70, 72], 70),
  new Student(4, "سارة أحمد", [44, 46, 45], 90)  // طالب متعثر (المتوسط: 45)
];

// 5. المخرجات الأساسية (تقارير الطلاب)
console.log("========================================");
console.log("       تقرير أداء الطلاب بالجامعة       ");
console.log("========================================");

studentsList.forEach(student => {
  const avg = student.calculateAverage();
  const grade = student.getGrade(avg);
  const result = student.getResult(avg);
  console.log(`الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${grade} | النتيجة: ${result}`);
});

// 4. لجنة الرأفة (Array Methods)

// أ. الاستخراج (filter): استخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg < 50;
});

// ب. المعالجة (map): إضافة 5 درجات رأفة كدعم لمتوسط هؤلاء الطلاب
const adjustedStruggling = strugglingStudents.map(student => {
  const oldAvg = student.calculateAverage();
  const newAvg = oldAvg + 5;
  return {
    ...student,
    originalAverage: oldAvg,
    newAverage: newAvg
  };
});

// ج. التحليل (reduce): جمع المتوسطات الجديدة بعد التعديل
const totalNewAverages = adjustedStruggling.reduce((sum, student) => sum + student.newAverage, 0);

// د. متوسط الرأفة: إضافة "درع حماية" لمنع القسمة على صفر
const count = adjustedStruggling.length;
const averageAfterGrace = count > 0 ? totalNewAverages / count : 0;

// 5. مخرجات لجنة الرأفة
console.log("\n========================================");
console.log("         تقرير لجنة الرأفة للتعثر       ");
console.log("========================================");
console.log(`عدد الطلاب المتعثرين المشمولين بالرأفة: ${count}`);

adjustedStruggling.forEach(student => {
  console.log(`- الطالب: ${student.name} | المتوسط القديم: ${student.originalAverage.toFixed(2)} | المتوسط بعد الرأفة: ${student.newAverage.toFixed(2)}`);
});

console.log(`----------------------------------------`);
console.log(`المتوسط العام لدرجات المتعثرين بعد الرأفة: ${averageAfterGrace.toFixed(2)}`);
console.log("========================================");