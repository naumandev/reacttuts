import { Table } from 'react-bootstrap';

function ListView(props) {
  return (
    <div className='container'>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>CNICs</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cnic}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListView;
