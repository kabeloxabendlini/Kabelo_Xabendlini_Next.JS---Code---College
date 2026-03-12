"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* Book Type */
type Book = {
  id: string;
  title: string;
  img: string;
  link: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchBooks(search: string = ""): Promise<void> {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/books/search?query=${encodeURIComponent(search)}`
      );

      if (!res.ok) throw new Error("Failed to fetch books");

      const data: Book[] = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  /* Search handler */
  function handleSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetchBooks(query);
  }

  return (
    <div className="space-y-6 w-full">
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-6 justify-center"
      >
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="input input-bordered w-1/2 text-black"
        />

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-white text-center">Loading books...</p>
      )}

      {/* No books */}
      {!loading && books.length === 0 && (
        <p className="text-white text-center">No books found</p>
      )}

      {/* Books grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-zinc-800 shadow-xl border border-gray-700"
          >
            <figure>
              <Image
                src={book.img}
                alt={book.title}
                width={200}
                height={150}
                className="rounded-t-md object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-white">
                {book.title}
              </h2>

              <div className="card-actions justify-end">
                <Link
                  href={book.link}
                  className="btn btn-primary text-white"
                >
                  See in Amazon
                </Link>

                <button className="btn btn-error text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}