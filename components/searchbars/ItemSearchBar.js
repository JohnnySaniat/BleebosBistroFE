import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function ItemSearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      router.push(`/search-items/${searchValue}`);
    } else {
      router.push('/items');
    }
    setSearchValue('');
  };

  const handleClearAndRefresh = () => {
    setSearchValue('');
    router.push('/items');
  };

  return (
    <Form id="search-bar" className="search-bar" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Search Items" size="med" onChange={handleChange} value={searchValue} />
      <Button variant="secondary" onClick={handleClearAndRefresh}>Clear & Refresh</Button>
    </Form>
  );
}
