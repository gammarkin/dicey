import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateChar from './pages/CreateChar.jsx';
import Char from './pages/Char.jsx';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
	{path: '/', element: <App />},
	{path: '/login', element: <Login />},
	{path: '/register', element: <Register />},
	{path: '/char/create/:tag', element: <CreateChar />},
	{path: '/char/:tag', element: <Char />},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
