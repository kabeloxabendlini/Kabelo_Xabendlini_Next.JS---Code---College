// /app/components/Repos.tsx
import Image from "next/image";
import Link from "next/link";

type ReposProps = {
  user: string;
  cardMode?: boolean; // optional prop
};

type Repo = {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

async function fetchRepos(user: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${user}/repos`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch repositories");
  return res.json();
}

export default async function Repos({ user, cardMode = false }: ReposProps) {
  const repos = await fetchRepos(user);

  // Card mode layout
  if (cardMode) {
    return (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {repos.length === 0 && (
          <div className="col-span-full text-center py-6 text-gray-700 dark:text-gray-400">
            No repositories found
          </div>
        )}

        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 hover:shadow-xl transition-shadow"
          >
            {/* Owner info */}
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                width={35}
                height={35}
                className="rounded-full border border-gray-300 dark:border-gray-600"
                unoptimized
              />
              <Link
                href={repo.owner.html_url}
                target="_blank"
                className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
              >
                {repo.owner.login}
              </Link>
            </div>

            {/* Repo Name */}
            <Link
              href={`https://github.com/${repo.owner.login}/${repo.name}`}
              target="_blank"
              className="text-lg font-semibold text-primary dark:text-blue-400 hover:underline block mb-2"
            >
              {repo.name}
            </Link>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {repo.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Table mode layout (default)
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {user}'s Repositories
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left border-b border-gray-300 dark:border-gray-700">
            <tr>
              <th className="py-3 px-4 text-gray-900 dark:text-gray-100">Owner</th>
              <th className="py-3 px-4 text-gray-900 dark:text-gray-100">Repository</th>
              <th className="py-3 px-4 text-gray-900 dark:text-gray-100">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {repos.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-700 dark:text-gray-400">
                  No repositories found
                </td>
              </tr>
            )}
            {repos.map((repo) => (
              <tr
                key={repo.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-5 px-4 align-top">
                  <div className="flex items-center gap-4">
                    <Image
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      width={40}
                      height={40}
                      className="rounded-full border border-gray-300 dark:border-gray-600"
                      unoptimized
                    />
                    <Link
                      href={repo.owner.html_url}
                      target="_blank"
                      className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
                    >
                      {repo.owner.login}
                    </Link>
                  </div>
                </td>
                <td className="py-5 px-4 align-top">
                  <Link
                    href={`https://github.com/${repo.owner.login}/${repo.name}`}
                    target="_blank"
                    className="text-primary font-medium dark:text-blue-400 hover:underline"
                  >
                    {repo.name}
                  </Link>
                </td>
                <td className="py-5 px-4 align-top max-w-md text-gray-700 dark:text-gray-300">
                  {repo.description || "No description available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}