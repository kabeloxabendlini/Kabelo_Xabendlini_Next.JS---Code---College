'use client';

import { useState } from 'react';
import Image from 'next/image';

type Book = {
  id?: string;
  title: string;
  img: string;
  link: string;
};

const AddBook = ({ refreshBooks }: { refreshBooks: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !img || !link) return;

    setLoading(true);
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, img, link }),
      });

      if (!res.ok) throw new Error('Failed to add book');

      refreshBooks();
      setTitle('');
      setImg('');
      setLink('');
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-accent" onClick={() => setModalOpen(true)}>
        Add Book
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            className="bg-zinc-800 p-6 rounded-lg w-full max-w-md relative"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="btn btn-sm btn-ghost absolute right-2 top-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4 text-white">Add New Book</h3>

            {/* Live Image Preview */}
            {img && (
              <div className="relative w-full aspect-[3/4] mb-4 border border-gray-600 rounded-lg overflow-hidden">
                <Image src={img} alt="Preview" fill style={{ objectFit: 'contain' }} />
              </div>
            )}

            {/* Title Input */}
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full text-black mb-2"
              required
            />

            {/* Image URL Input */}
            <label htmlFor="img" className="sr-only">
              Image URL
            </label>
            <input
              type="text"
              id="img"
              name="img"
              placeholder="Image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="input input-bordered w-full text-black mb-2"
              required
            />

            {/* Amazon Link Input */}
            <label htmlFor="link" className="sr-only">
              Amazon Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="Amazon Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="input input-bordered w-full text-black mb-4"
              required
            />

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBook;