import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Admin from "./components/Admin/Admin";
function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <Router>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<AdminLogin />} />
                <Route exact path='/admin' element={<Admin />} />
              </Routes>
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
