import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ContactUs from './component/ContactUs';
import Login from './component/Login';
import Quillexam from './component/Quillexam'
import Blogpost from './component/Blogpost';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard/Dashboard';
import ContactSubmit from './component/ContactSubmit';
import Navbar from './component/Navbar';
import BlogContent from './component/BlogContent';
import Blogdash from './component/Dashboard/Blogdash';
import Pages from './component/Pages';
import AuthState from './context/AuthState';
import BlogPageCreate from './component/Dashboard/BlogPageCreate';
import CreateBlog from './component/Dashboard/CreateBlog';
import Protected from './Protected';
import CreateProtfolio from './component/Dashboard/CreateProtfolio';
import Projects from './component/Dashboard/ProtfolioComp/Projects';
import Skills from './component/Dashboard/ProtfolioComp/Skills';
import WorkExperience from './component/Dashboard/ProtfolioComp/WorkExperience';
import ProtfolionDash from './component/Dashboard/ProtfolioComp/ProtfolionDash';
import LatestPost from './component/LatestPost';
import Education from './component/Dashboard/ProtfolioComp/Education';
import MyAccount from './component/Dashboard/MyAccount';
import NotFound from './component/NotFound';
import Pagedash from './component/Dashboard/Pagedash';
import ContactDash from './component/Dashboard/ContactDash';
import ShowPort from './component/Dashboard/ProtfolioComp/ShowProtfolionComponent/ShowPort';
import PageContent from './component/PageContent';
import Footer from './component/Footer';
import About from './component/Dashboard/ProtfolioComp/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <Router>
        <App />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/dashboard" element={<Protected Component={Dashboard} />}>

            <Route path="/dashboard/blog">
              <Route index element={<Blogdash />} />
              <Route path=":bid" element={<CreateBlog />} />


            </Route>
            <Route path="/dashboard/pages">
              <Route index element={<Pagedash />} />
              <Route path=":id" element={<BlogPageCreate />} />

            </Route>
            <Route path="/dashboard/portfolio">
              <Route index element={<ProtfolionDash />} />

              <Route path="/dashboard/portfolio/about">
                <Route index element={<About />} />
              </Route>
              <Route path="/dashboard/portfolio/education">
                <Route index />
                <Route path=":id" element={<Education />} />

              </Route>
              <Route path="/dashboard/portfolio/experience">
                <Route index />
                <Route path=":id" element={<WorkExperience />} />

              </Route>
              <Route path="/dashboard/portfolio/project">
                <Route index />
                <Route path=":id" element={<Projects />} />
              </Route>
              <Route path="/dashboard/portfolio/skill">
                <Route index />
                <Route path=":id" element={<Skills />} />
              </Route>

            </Route>
            <Route path="/dashboard/contact">
              <Route index element={<ContactDash />} />


            </Route>
            <Route path="/dashboard/account">
              <Route index element={<MyAccount />} />

            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/blog">
            <Route index element={<Blogpost />} />
            <Route path=":id" element={<BlogContent />} />
          </Route>
          <Route path="/pages" element={<Pages />}>
            <Route index />
            <Route path=":id" element={<PageContent />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/submitted" element={<ContactSubmit />} />
          <Route path="/portfolio">

            <Route path=":id" element={<ShowPort />} />
          </Route>
          <Route path="" element={<Blogpost />} />

          <Route path="contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />






        </Routes>


        <Footer />
      </Router>
    </AuthState>

  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
