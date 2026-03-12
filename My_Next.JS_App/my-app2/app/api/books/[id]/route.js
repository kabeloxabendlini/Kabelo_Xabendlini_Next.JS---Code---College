import { NextResponse } from "next/server";
import books from "../../data.json"; // adjust path if needed

// GET: Fetch a single book by ID
export async function GET(req, { params }) {
  const id = parseInt(params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

// DELETE: Delete a book by ID
export async function DELETE(req, { params }) {
  const id = parseInt(params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  books.splice(index, 1);

  return NextResponse.json({ message: "Book deleted successfully", id });
}