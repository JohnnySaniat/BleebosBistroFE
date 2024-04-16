import React, { useEffect, useState } from 'react';
import { getAllItems } from '../api/itemData';
import ItemCard from '../components/cards/ItemCard';
import ItemSearchBar from '../components/searchbars/ItemSearchBar';

function ShowItems() {
  const [items, setItems] = useState([]);

  const getAllTheItems = () => {
    getAllItems().then(setItems);
  };

  useEffect(() => {
    getAllTheItems();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <ItemSearchBar className="navSearch" />
        <div className="d-flex flex-wrap">
          {items.map((item) => <ItemCard key={item.id} itemObj={item} onUpdate={getAllItems} />)}
        </div>
      </div>
    </>
  );
}

export default ShowItems;
