import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { apiRequest } from "../../features/apiRequest";
import { RootState } from "../../redux/store";
import { setData } from "../../redux/slice";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

// Определяем тип для ключей, которые могут быть использованы в фильтрах
type FilterKeys = keyof Omit<User, 'id'>; // исключаем 'id'

const Tables: React.FC = () => {
  const apiData = useSelector((state: RootState) => state.ApiDataState.apiData) as User[] | null;
  const dispatch = useDispatch();
  
  const [filters, setFilters] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const [selectedFilter, setSelectedFilter] = useState<FilterKeys>('name'); // Стейт для выбранного фильтра

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest();
      if (data) {
        dispatch(setData(data));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [selectedFilter]: e.target.value, // Обновляем только выбранный фильтр
    });
  };

  const handleSelectFilter = (filter: FilterKeys) => {
    setSelectedFilter(filter);
  };

  const filteredData = (apiData || []).filter(user =>
    Object.entries(filters).every(([key, value]) => {
      const userValue = user[key as FilterKeys]; // Приводим key к типу FilterKeys
      return userValue ? userValue.toString().toLowerCase().includes(value.toLowerCase()) : false;
    })
  );

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <Dropdown onSelect={(eventKey: any) => handleSelectFilter(eventKey as FilterKeys)}>
          <Dropdown.Toggle variant="outline-secondary">
            {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} {/* Отображаем выбранный фильтр */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="name">Name</Dropdown.Item>
            <Dropdown.Item eventKey="username">Username</Dropdown.Item>
            <Dropdown.Item eventKey="email">Email</Dropdown.Item>
            <Dropdown.Item eventKey="phone">Phone</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <FormControl
          placeholder={`Filter by ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}`}
          value={filters[selectedFilter]} // Используем значение выбранного фильтра
          onChange={handleFilterChange}
        />
      </InputGroup>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No results found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Tables;
