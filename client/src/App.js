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
import EditWebTemplate from "./components/EditWebTemplate/EditWebTemplate";

import AllProducts from "./components/AllProducts/AllProducts";

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
                    path='/products'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <AllProducts />
                      </ProtectedRoute>
                    }
                  />
                  {/* product keys start*/}
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
                    path='/admin/product_keys/pp2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <ProductKeyTable
                          key={"product_key_pp21"}
                          table={"Product key 2021"}
                          version={"Pro Plus"}
                          title={"Office PP 2021 Product Keys"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/product_keys/hb2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <ProductKeyTable
                          key={"product_key_HB21"}
                          table={"Product key HB 2021"}
                          version={"HB"}
                          title={"Office HB 2021 Product Keys"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  {/* product keys end */}
                  {/* unique codes start */}
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
                    path='/admin/unique_codes/pp2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          key={"unique_code_pp21"}
                          table={"Unique code 2021"}
                          version={"Pro Plus"}
                          title={"Office PP 2021 Unique Codes"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/unique_codes/hb2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <UniqueCodeTable
                          key={"unique_code_HB_pp21"}
                          table={"Unique code HB 2021"}
                          version={"HB"}
                          title={"Office HB 2021 Unique Codes"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  {/* unique codes end */}
                  {/* upload product keys starts */}
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
                    path='/admin/upload/product_keys/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Product Keys PP 2019' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/product_keys/pp2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Product Keys PP 2021' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/product_keys/hb2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Product Keys HB 2021' />
                      </ProtectedRoute>
                    }
                  />
                  {/* upload product keys end */}
                  {/* upload unique codes start */}
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
                    path='/admin/upload/unique_codes/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique Codes PP 2019' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/unique_codes/pp2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique Codes PP 2021' />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/upload/unique_codes/hb2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Upload title='Upload Unique Codes HB 2021' />
                      </ProtectedRoute>
                    }
                  />
                  {/* upload unique codes end */}
                  {/* edit templates starts */}
                  <Route
                    path='/admin/template/pp2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <EditWebTemplate
                          title={"Download steps for Pro Plus 2016"}
                          version={"Pro Plus 2016"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/template/pp2019'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <EditWebTemplate
                          title={"Download steps for Pro Plus 2019"}
                          version={"Pro Plus 2019"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/template/pp2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <EditWebTemplate
                          title={"Download steps for Pro Plus 2021"}
                          version={"Pro Plus 2021"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/admin/template/hb2021'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <EditWebTemplate
                          title={"Download steps for HB 2021"}
                          version={"HB 2021"}
                        />
                      </ProtectedRoute>
                    }
                  />
                  {/* edit templates end */}

                  {/* success routes start */}
                  <Route
                    path='/authorized'
                    element={
                      <ProtectedRouteAuthorized>
                        <OOPP2016Template />
                      </ProtectedRouteAuthorized>
                    }
                  />
                  {/* success routes end */}
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
