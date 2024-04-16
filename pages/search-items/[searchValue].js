/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchItems } from '../../api/itemData';
import ItemCard from '../../components/cards/ItemCard';
import ItemSearchBar from '../../components/searchbars/ItemSearchBar';

export default function Search() {
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const { searchValue } = router.query;

  const searchAllItems = () => {
    searchItems(searchValue).then(setFilteredItems);
  };

  useEffect(() => {
    searchAllItems();
    return () => {
      setFilteredItems([]);
    };
  }, [searchValue]);

  return (
    <>
      <div className="text-center my-4">
        <ItemSearchBar className="navSearch" />
        <div className="d-flex flex-wrap">
          {filteredItems.map((item) => <ItemCard key={item.id} itemObj={item} onUpdate={searchAllItems} />)}
        </div>
      </div>
    </>
  );
}
