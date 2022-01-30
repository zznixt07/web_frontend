import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Video from './views/Video'
import Upload, {DraftVideo} from './views/Upload'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
              <Route path="/" >
                <Route index element={<App />}></Route>
                <Route path="vid" element={<Video />}></Route>
                <Route path="upload" element={<Upload />}></Route>
                <Route path="draft" element={<DraftVideo />}></Route>
                
                
              </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
