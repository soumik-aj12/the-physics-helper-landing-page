export function generateRollNumber(examId: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const coursePrefix = examId.substring(0, 3).toUpperCase();
  return `${coursePrefix}${year}${random}`;
}

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
export async function createAdmitCardPDF({ studentName, studentEmail, rollNumber, examName, classLevel, studentPhone, date }: {
  studentName: string
  studentEmail: string
  rollNumber: string
  examName: string
  classLevel: string
  studentPhone: string
  date: string
}): Promise<Buffer> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Header
  page.drawText('EXAMINATION ADMIT CARD', {
    x: width / 2 - 130,
    y: height - 50,
    size: 20,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  // Institution name (customize as needed)
  page.drawText('The Physics Helper', {
    x: width / 2 - 80,
    y: height - 80,
    size: 16,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Draw a line
  page.drawLine({
    start: { x: 50, y: height - 100 },
    end: { x: width - 50, y: height - 100 },
    thickness: 2,
    color: rgb(0, 0, 0),
  });

  // Student details section
  let yPosition = height - 140;
  const lineHeight = 30;
  const leftMargin = 70;

  // Roll Number (prominent)
  page.drawText('Roll Number:', {
    x: leftMargin,
    y: yPosition,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(rollNumber , {
    x: leftMargin + 120,
    y: yPosition,
    size: 14,
    font: helvetica,
    color: rgb(0, 0, 0.8),
  });

  yPosition -= lineHeight;

  // Student Name
  page.drawText('Student Name:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(studentName, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight;

  // Guardian Name
  // if (studentData.guardianName) {
  //   page.drawText('Guardian Name:', {
  //     x: leftMargin,
  //     y: yPosition,
  //     size: 12,
  //     font: helveticaBold,
  //     color: rgb(0, 0, 0),
  //   });
  //   page.drawText(studentData.guardianName, {
  //     x: leftMargin + 120,
  //     y: yPosition,
  //     size: 12,
  //     font: helvetica,
  //     color: rgb(0, 0, 0),
  //   });
  //   yPosition -= lineHeight;
  // }

  // Date of Birth
  // page.drawText('Date of Birth:', {
  //   x: leftMargin,
  //   y: yPosition,
  //   size: 12,
  //   font: helveticaBold,
  //   color: rgb(0, 0, 0),
  // });
  // page.drawText(studentData.dob, {
  //   x: leftMargin + 120,
  //   y: yPosition,
  //   size: 12,
  //   font: helvetica,
  //   color: rgb(0, 0, 0),
  // });

  yPosition -= lineHeight;

  // Course
  page.drawText('Exam:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(examName, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight;

  // Email
  page.drawText('Email:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(studentEmail, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight;

  // Phone
  page.drawText('Phone:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(studentPhone, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight * 1.5;

  // Draw another line
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: width - 50, y: yPosition },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  });

  yPosition -= lineHeight;

  // Exam Details Section
  page.drawText('EXAMINATION DETAILS', {
    x: leftMargin,
    y: yPosition,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0.8),
  });

  yPosition -= lineHeight;

  // // Exam Center
  // page.drawText('Exam Center:', {
  //   x: leftMargin,
  //   y: yPosition,
  //   size: 12,
  //   font: helveticaBold,
  //   color: rgb(0, 0, 0),
  // });
  // page.drawText(studentData.examCenter, {
  //   x: leftMargin + 120,
  //   y: yPosition,
  //   size: 12,
  //   font: helvetica,
  //   color: rgb(0, 0, 0),
  // });
  
  page.drawText('Class:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(classLevel, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight;

  // Exam Date
  page.drawText('Exam Date:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(date, {
    x: leftMargin + 120,
    y: yPosition,
    size: 12,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight;

  // Exam Time
  // page.drawText('Exam Time:', {
  //   x: leftMargin,
  //   y: yPosition,
  //   size: 12,
  //   font: helveticaBold,
  //   color: rgb(0, 0, 0),
  // });
  // page.drawText(studentData.examTime, {
  //   x: leftMargin + 120,
  //   y: yPosition,
  //   size: 12,
  //   font: helvetica,
  //   color: rgb(0, 0, 0),
  // });

  // yPosition -= lineHeight * 2;

  // Instructions section
  page.drawText('IMPORTANT INSTRUCTIONS:', {
    x: leftMargin,
    y: yPosition,
    size: 12,
    font: helveticaBold,
    color: rgb(0.8, 0, 0),
  });

  yPosition -= 25;

  const instructions = [
    '1. Candidates must carry this admit card to the examination center.',
    '2. Candidates must reach the examination center 30 minutes before the exam.',
    '3. Electronic devices are not allowed in the examination hall.',
    '4. Candidates must carry a valid photo ID proof.',
    '5. This admit card is valid only for the mentioned examination.',
  ];

  for (const instruction of instructions) {
    page.drawText(instruction, {
      x: leftMargin,
      y: yPosition,
      size: 10,
      font: helvetica,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  }

  // Footer
  page.drawText('This is a computer-generated document and does not require a signature.', {
    x: width / 2 - 180,
    y: 50,
    size: 9,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });

  // // Add profile photo if provided (as base64)
  // if (studentData.profilePhoto && studentData.profilePhoto.startsWith('data:image')) {
  //   try {
  //     const base64Data = studentData.profilePhoto.split(',')[1];
  //     const imageBytes = Buffer.from(base64Data, 'base64');

  //     let image;
  //     if (studentData.profilePhoto.includes('image/png')) {
  //       image = await pdfDoc.embedPng(imageBytes);
  //     } else {
  //       image = await pdfDoc.embedJpg(imageBytes);
  //     }

  //     page.drawImage(image, {
  //       x: width - 170,
  //       y: height - 240,
  //       width: 100,
  //       height: 120,
  //     });

  //     // Photo frame
  //     page.drawRectangle({
  //       x: width - 170,
  //       y: height - 240,
  //       width: 100,
  //       height: 120,
  //       borderColor: rgb(0, 0, 0),
  //       borderWidth: 1,
  //     });
  //   } catch (error) {
  //     console.error('Error embedding photo:', error);
  //   }
  // }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
