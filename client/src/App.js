import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { AuthContextProvider } from "./context/Context";
import ProtectedRoute from "./components/ProctedRoute";
import ProtectedRouteAuthorized from "./components/ProtectedRouteAuthorized";
import Navigation from "./components/Navigation/Navigation";
import CustomerDataTable from "./RetriveTables/CustomerDataTable";
import UniqueCodeTable from "./RetriveTables/UniqueCodeTable/UniqueCodeTable";
import ProductKeyTable from "./RetriveTables/ProductKeyTable/ProductKeyTable";
import OOPP2016Template from "./components/WebTemplate/OPPOnlineTemplate";
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
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<AdminLogin />} />
                  <Route
                    path='/admin'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <CustomerDataTable />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/product_keys/pp2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <ProductKeyTable
                          key={"product_key_pp16"}
                          table={"Product key 2016"}
                          version={"Pro Plus"}
                          title={"Office PP 2016 Product Keys"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/product_keys/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <ProductKeyTable
                          key={"product_key_pp19"}
                          table={"Product key 2019"}
                          version={"Pro Plus"}
                          title={"Office PP 2019 Product Keys"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/unique_codes/pp2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          key={"unique_code_pp16"}
                          table={"Unique code 2016"}
                          version={"Pro Plus"}
                          title={"Office PP 2016 Unique Codes"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/unique_codes/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          key={"unique_code_pp19"}
                          table={"Unique code 2019"}
                          version={"Pro Plus"}
                          title={"Office PP 2019 Unique Codes"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/product_keys/pp2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Product Keys PP 2016' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/unique_codes/pp2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique Codes PP 2016' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/product_keys/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Product Keys PP 2019' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/unique_codes/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique Codes PP 2019' />
                      </ProtectedRoute>
                    }
                  />

                  <Route
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
                    path='/authorized'
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
