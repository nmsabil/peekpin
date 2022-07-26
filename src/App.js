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
  const [officeProPlusSixteen, setOfficeProPlusSixteen] = useState([]);
  const [officeProPlusSixteenColumn, setofficeProPlusSixteenColumn] = useState([
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Upload Date",
      selector: (row) => row.UploadDate.nanoseconds,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ]);

  const [customerDataColumn, setCustomerDataColumn] = useState([
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },

    {
      name: "Year",
      selector: (row) => row.Year,
      sortable: true,
    },
    {
      name: "Product Key",
      selector: (row) => row.ProductKey,
      sortable: true,
    },
    {
      name: "Unique Code",
      selector: (row) => row.UniqueCode,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.Time.nanoseconds,
      sortable: true,
    },
  ]);

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
    const q = query(collection(db, "Product key 2016"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pp2016A = [];
      querySnapshot.forEach((doc) => {
        pp2016A.push({ ...doc.data(), id: doc.id });
        pp2016A.forEach((e) => {
          Object.keys(e).forEach((key) => {
            if (key === "status" && e.status === true) {
              e.status = "Active";
            } else if (key === "status" && e.status === false) {
              e.status = "Inactive";
            }
          });
        });
      });
      setOfficeProPlusSixteen(pp2016A);
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
                        <Table
                          data={customerData}
                          columns={customerDataColumn}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path='/admin/keys2016'
                    element={
                      <ProtectedRoute>
                        <Navigation />
                        <Table
                          data={officeProPlusSixteen}
                          columns={officeProPlusSixteenColumn}
                        />
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
