import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

// GET: fetch a single book by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!book) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("GET /api/books/:id failed:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: remove a book by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (err: any) {
    // Prisma record not found
    if (err?.code === "P2025") {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    console.error("DELETE /api/books/:id failed:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}