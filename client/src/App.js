import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { AuthContextProvider } from "./context/Context";
import ProtectedRoute from "./components/ProctedRoute";
import ProtectedRouteAuthorized from "./components/ProtectedRouteAuthorized";
import Navigation from "./components/Navigation/Navigation";
import CustomerDataTable from "./RetriveData/CustomerDataTable";
import UniqueCodeTable from "./RetriveData/UniqueCodeTable/UniqueCodeTable";
import ProductKeyTable from "./RetriveData/ProductKeyTable/ProductKeyTable";
import OOPP2016Template from "./components/WebTemplate/OPP2016Template";
import Upload from "./components/Upload/Upload";

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
                        <ProductKeyTable
                          table={"Product key 2016"}
                          version={"Pro Plus"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/unique-code-2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          year={"Unique code 2016"}
                          version={"Pro Plus"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/upload-product-key-2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload PP 2016' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/upload-unique-code-2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique code 2016' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <ProductKeyTable
                          table={"Product key 2019"}
                          version={"Pro Plus"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/unique-code-2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          table={"Unique code 2019"}
                          version={"Pro Plus"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          year={"Unique code 2016"}
                          version={"Pro Plus"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/authorized_unique_code_pp16'
                    element={
                      <ProtectedRouteAuthorized>
                        <OOPP2016Template />
                      </ProtectedRouteAuthorized>
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
