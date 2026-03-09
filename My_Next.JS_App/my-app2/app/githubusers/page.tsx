import Link from "next/link";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

async function fetchGitHubUsers(): Promise<GitHubUser[]> {
  const res = await fetch("https://api.github.com/search/users?q=greg");
  const json = await res.json();
  return json.items;
}

const GitHubUsersPage = async () => {
  const users = await fetchGitHubUsers();

  return (
    <div className="overflow-x-auto p-6">
      <table className="table w-full">
        <thead>
          <tr className="text-lg text-left">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">URL</th>
            <th className="px-6 py-4">Repos</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: GitHubUser) => (
            <tr key={user.id} className="hover">
              <td className="px-6 py-5">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-lg"
                  />

                  <div>
                    <div className="font-bold">{user.login}</div>
                    <div className="text-sm opacity-50">{user.id}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5">
                <Link href={user.html_url} className="btn btn-link">
                  View on GitHub
                </Link>
              </td>

              <td className="px-6 py-5">
                <Link
                  href={`/githubusers/${user.login}`}
                  className="btn btn-outline btn-sm"
                >
                  Go to Repos
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GitHubUsersPage;