'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddBook from "./AddBook";

type Book = {
  id: number;
  title: string;
  img: string;
  link: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/books/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete book");
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 w-full px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row gap-3 md:gap-2 justify-between items-center mb-6">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full text-black"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <AddBook refreshBooks={fetchBooks} />
      </div>

      {loading && <p className="text-center text-white">Loading books...</p>}
      {!loading && books.length === 0 && <p className="text-center text-white">No books found</p>}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="relative overflow-hidden rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200 bg-zinc-900 border border-gray-700">
            <div className="relative w-full h-80">
              <Image src={book.img} alt={book.title} fill style={{ objectFit: "contain" }} />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
              <h2 className="text-white text-lg font-semibold line-clamp-2 mb-2">{book.title}</h2>
              <div className="flex gap-2">
                <Link href={book.link} target="_blank" className="btn btn-primary btn-sm flex-1">See in Amazon</Link>
                <button onClick={() => deleteBook(book.id)} className="btn btn-error btn-sm flex-1">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}