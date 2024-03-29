import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Video from './views/Video'
import Upload from './views/Upload'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'
import { LoginForm } from 'components/Login'

import toast, { Toaster } from 'react-hot-toast'
import { Register } from 'components/Register'
import UserVideos from 'views/UserVideos'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ORIGIN
axios.defaults.headers.common['Content-Type'] = 'application/json'
const localAuth = localStorage.getItem('auth')
if (localAuth) {
	try {
		const auth = JSON.parse(localAuth)
		if (auth.token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
		}
	} catch (e: any) {
		console.error(e)
	}
}
axios.defaults.validateStatus = (status) => status >= 200 && status < 500

// first param is for validateStatus that returns true and
// second param is for validateStatus that returns false
axios.interceptors.response.use(
	(resp) => {
		if (resp.status === 401) {
			if (window.location.pathname !== '/login') {
				toast.error('You must be logged in to do that')
				window.location.href = '/login'
			}
		}
		return resp
	},
	(err) => {
		return Promise.reject(err)
	}
)
;(window as any).axios = axios

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<div>
				<Toaster />
			</div>
			<Routes>
				<Route path='/'>
					<Route index element={<App />}></Route>
					<Route path='videos/:id' element={<Video />}></Route>
					<Route path='upload' element={<Upload />}></Route>
					<Route path='login' element={<LoginForm />}></Route>
					<Route path='register' element={<Register />}></Route>
					<Route path='user/videos/:username' element={<UserVideos />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
