import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Admin from "./components/Admin/Admin";
import { AuthContextProvider } from "./context/Context";
import ProtectedRoute from "./components/ProctedRoute";
function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <AuthContextProvider>
              <Router>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<AdminLogin />} />
                  <Route
                    exact
                    path='/admin'
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </AuthContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
