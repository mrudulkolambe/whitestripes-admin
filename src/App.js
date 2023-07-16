import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContextProvider } from './context/Auth';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { ContactContextProvider } from './context/Contact';
import ViewServices from './pages/ViewServices';
import { ServiceContextProvider } from './context/Services';
import { BlogsContextProvider } from './context/Blogs';
import CreateBlog from './pages/CreateBlog';
import ViewBlogs from './pages/ViewBlogs';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <ContactContextProvider>
            <ServiceContextProvider>
              <BlogsContextProvider>
                <Routes>
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/" element={<Login />} />
                  {/* <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/edit-services/:id" element={<Services />} /> */}
                  {/* <Route path="/view/services" element={<ViewServices />} /> */}
                  <Route path="/blog" element={<CreateBlog />} />
                  <Route path="/view/blogs" element={<ViewBlogs />} />
                  <Route path="/edit-blog/:id" element={<CreateBlog />} />
                </Routes>
              </BlogsContextProvider>
            </ServiceContextProvider>
          </ContactContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
