import { NextResponse } from "next/server";
import { prisma } from "../../lib/db"; // make sure this path is correct

// Define the Book type for TypeScript
type Book = {
  title: string;
  link: string;
  img: string;
};

// Dummy books to seed if DB is empty
const dummyBooks: Book[] = [
  {
    title: "MERN Stack",
    link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
    img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg",
  },
  {
    title: "Beginning GraphQL",
    link: "https://www.amazon.com/Beginning-GraphQL-React-NodeJS-Apollo/dp/B0BXMRB5VF/",
    img: "https://m.media-amazon.com/images/I/41+PG6uPdHL._SX404_BO1,204,203,200_.jpg",
  },
  {
    title: "Beginning React Hooks",
    link: "https://www.amazon.com/Beginning-React-Hooks-Greg-Lim/dp/B0892HRT3C/",
    img: "https://m.media-amazon.com/images/I/41e9U1d9QIL._SX404_BO1,204,203,200_.jpg",
  },
];

// Helper function to seed DB
async function seedDummyBooks() {
  for (const book of dummyBooks) {
    const exists = await prisma.book.findFirst({ where: { title: book.title } });
    if (!exists) await prisma.book.create({ data: book });
  }
  console.log("Seeded dummy books (if DB was empty)");
}

// ------------------ GET: Fetch books ------------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query")?.trim();

    let books: Book[];
    const allBooks = await prisma.book.findMany();

    // If query exists, filter books by title (case-insensitive)
    if (query) {
      const lowerQuery = query.toLowerCase();
      books = allBooks.filter(book => book.title.toLowerCase().includes(lowerQuery));
    } else {
      books = allBooks;
    }

    // If no books, seed dummy data and fetch again
    if (books.length === 0) {
      await seedDummyBooks();
      books = await prisma.book.findMany();
    }

    // Sort books by title
    return NextResponse.json(books);
  } catch (err) {
    console.error("GET /api/books failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ------------------ POST: Add new book ------------------
export async function POST(req: Request) {
  try {
    const { title, link, img } = await req.json();

    if (!title?.trim() || !link?.trim() || !img?.trim()) {
      return NextResponse.json({ error: "Missing title, link, or img" }, { status: 400 });
    }

    // Prevent duplicate by title
    const existing = await prisma.book.findFirst({ where: { title } });
    if (existing) {
      return NextResponse.json({ error: "Book with this title already exists" }, { status: 409 });
    }

    const newBook = await prisma.book.create({ data: { title, link, img } });

    return NextResponse.json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("POST /api/books failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}