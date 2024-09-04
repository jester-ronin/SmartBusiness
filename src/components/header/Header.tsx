import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './header.css'

const Header: React.FC = () => {

    return (
        <Container fluid>
            <Row>
                <Col className='header' sm={12}>
                   <h1 className='title'>User table</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
