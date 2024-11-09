import React from 'react';
import './index.scss';
import Collection from './Collection';

const categories = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "Cities" }
];

function App() {
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://672e7521229a881691f01d93.mockapi.io/collections?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then(json => {
      setCollection(json);
    })
    .catch(err => {
      console.warn(err);
      alert('Receiving data error')
    })
    .finally(setIsLoading(false));
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>My collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li onClick={() => setCategoryId(i)} className={categoryId == i ? 'active' : ''} key={obj.name}>{obj.name}</li>
          ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Name search" />
      </div>
      <div className="content">
        {isLoading ? <h2>Loading...</h2> : collection.filter(obj => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        .map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
        />
        ))}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
