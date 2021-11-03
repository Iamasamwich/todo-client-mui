interface Body {
  todo?: string;
  step?: string;
  done?: boolean;
  dueDate?: string;
  email?: string;
  pword?: string;
};

// const host = 'http://localhost:3000';
const host = 'http://192.168.43.5:3000';

const api = (path : string, method : "POST" | "GET" | "PUT" | "DELETE", body?: Body) => {
  return fetch(host + path, {
    method,
    headers: {
      'Content-Type' : 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
};

export default api;