// /app/api/books/search/route.js
import { NextResponse } from "next/server";
import books from "../../data.json";

// GET: Fetch all books or search books
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredBooks);
}

// POST: Add a new book
export async function POST(request) {
  const { title, link, img } = await request.json();

  const newBook = {
    id: books.length + 1,
    title,
    link,
    img,
  };

  books.push(newBook);

  return NextResponse.json({
    message: "Book added successfully",
    book: newBook,
  });
}

