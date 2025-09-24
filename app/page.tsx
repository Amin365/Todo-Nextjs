import Link from 'next/link';
import { fetchtodos } from './lib/todos';
import { ToggleTodo } from './actions/toggle';
import { DeleteTodo } from './actions/delete';

export default async function Home({ searchParams }: { searchParams?: { search?: string; filter?: string } }) {
  const search = searchParams?.search || "";
  const filter = searchParams?.filter || "all"; 

  let todos = await fetchtodos();

  // 🔍 Search filter
  if (search) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter === "completed") {
    todos = todos.filter(todo => todo.completed);
  } else if (filter === "pending") {
    todos = todos.filter(todo => !todo.completed);
  }

  const time = new Date().toLocaleTimeString();

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Todo App</h1>
        <p className="text-sm text-gray-500 mb-4">Last updated: {time}</p>

        {/* 🔍 Search + Filter */}
        <form className="flex items-center gap-3 mb-6">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search todos..."
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />

          <select
            name="filter"
            defaultValue={filter}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No todos found!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo._id.toString()}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <form action={ToggleTodo.bind(null, todo._id.toString())}>
                    <button
                      type="submit"
                      className="text-2xl hover:scale-110 transition-transform"
                      title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {todo.completed ? "✅" : "⬜"}
                    </button>
                  </form>

                  <span
                    className={`flex-1 text-lg ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/edit/${todo._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="Edit todo"
                  >
                    ✏️
                  </Link>

                  <form action={DeleteTodo.bind(null, todo._id.toString())}>
                    <button
                      type="submit"
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete todo"
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
