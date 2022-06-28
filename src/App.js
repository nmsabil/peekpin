import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { AuthContextProvider } from "./context/Context";
import ProtectedRoute from "./components/ProctedRoute";
import { db } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Table from "./components/Table/Table";

function App() {
  const [customerData, setCustomerData] = useState([]);
  const [pp2016, setPp2016] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Customer data"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let customerDataA = [];
      querySnapshot.forEach((doc) => {
        customerDataA.push({ ...doc.data(), id: doc.id });
      });
      setCustomerData(customerDataA);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Product Key 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016A = [];
      querySnapshot.forEach((doc) => {
        pp2016A.push({ ...doc.data(), id: doc.id });
      });
      setPp2016(pp2016);
    });
    return () => unsub();
  }, []);

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
                        <Table data={customerData} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Table data={pp2016} />
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
