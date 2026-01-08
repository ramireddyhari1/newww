import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(_req: Request) {
    const doc = new PDFDocument();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chunks: any[] = [];

    doc.on("data", (c: unknown) => chunks.push(c));
    // doc.on("end") is handled by the promise below/event loop style, 
    // but for Next.js response we can just wait for doc.end() 
    // Actually simplest way to return buffer in Next.js app router:

    doc.fontSize(25).fillColor('#2f5d50').text("Vishnavi Organics", 50, 50);
    doc.fontSize(10).fillColor('black').text("123, Temple Street, Vijayawada, AP", 50, 80);
    doc.text("GSTIN: 36ABCDE1234F1Z5", 50, 95);

    doc.moveDown();
    const tableTop = 150;

    // Table Header
    doc.font("Helvetica-Bold");
    doc.text("Item", 50, tableTop);
    doc.text("Qty", 250, tableTop);
    doc.text("Rate", 300, tableTop);
    doc.text("GST (5%)", 360, tableTop);
    doc.text("Amount", 450, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // Mock Item Row
    const itemY = tableTop + 30;
    doc.font("Helvetica");
    doc.text("Organic Jaggery (1kg)", 50, itemY);
    doc.text("1", 250, itemY);
    doc.text("180", 300, itemY);
    doc.text("9.00", 360, itemY);
    doc.text("189.00", 450, itemY);

    doc.moveTo(50, itemY + 20).lineTo(550, itemY + 20).strokeColor('#aaaaaa').stroke();

    // Totals
    const totalY = itemY + 40;
    doc.font("Helvetica-Bold");
    doc.text("Grand Total:", 360, totalY);
    doc.text("₹189.00", 450, totalY);

    doc.fontSize(10).fillColor('grey').text("Thank you for choosing pure organic products!", 50, 700, { align: 'center' });

    doc.end();

    const buffer = await new Promise<Buffer>((resolve) => {
        doc.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(buffer as any, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="invoice.pdf"',
        },
    });
}
