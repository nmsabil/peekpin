import { Row, Container, Col } from "react-bootstrap";
import Home from "./components/Home/Home";
import "./App.scss";
function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <Home />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
