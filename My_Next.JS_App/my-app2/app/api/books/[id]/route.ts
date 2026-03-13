// /app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({ where: { id: params.id } });
    if (!book) return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (err) {
    console.error("GET by ID failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Book deleted successfully", book });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    console.error("DELETE failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}