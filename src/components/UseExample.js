import React, { Suspense, use } from 'react'

const loadUsers = new Promise((resolve, reject) => {
  setTimeout(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      resolve(data)
    } catch (error) {
      reject(error)
    }
  }, 1500)
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Ошибка загрузки данных. Попробуйте обновить страницу.</p>;
    }
    return this.props.children;
  }
}



function UsersList() {
  const users = use(loadUsers);

  return (
    <>
      <ul className="collection">
        {users.map((user) => (
          <li key={user.id} className="collection-item">
            {user.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export const UseExample = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading.....</p>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>

  );
}
