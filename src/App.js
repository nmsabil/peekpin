import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { AuthContextProvider } from "./context/Context";
import ProtectedRoute from "./components/ProctedRoute";
import Navigation from "./components/Navigation/Navigation";
import CustomerDataTable from "./RetriveData/CustomerDataTable";
import OPP16PK from "./RetriveData/OfficePP2016/OPP16PK";
import OPP16UC from "./RetriveData/OfficePP2016/OPP16UC";

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
                        <Navigation />
                        <CustomerDataTable />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <OPP16PK />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/unique-code-2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <OPP16UC />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <h1>PP 2019</h1>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <h1>PP 2021</h1>
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
