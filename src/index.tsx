import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Video from './views/Video'
import Upload from './views/Upload'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'
import { LoginForm } from 'components/LoginSignUp'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ORIGIN
axios.defaults.headers.common['Content-Type'] = 'application/json'

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
																																																																																																																																			 																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		