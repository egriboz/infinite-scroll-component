import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const productsGrid = {
  width: 400,
  height: 300,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const App = () => {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const getFirstProducts = async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?page=1`);
      const dataJson = await res.json();
      const data = dataJson.results;
      setItems(data);
    };

    getFirstProducts();
  }, []);

  const getFetchProducts = async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const dataJson = await res.json();
    const data = dataJson.results;
    return data;
  };

  const fetchData = async () => {
    setTimeout(async () => {
      const scrollingItem = await getFetchProducts();
      console.log("scrollingItem:", scrollingItem)
      setItems([...items, ...scrollingItem]);

      if (scrollingItem.length === 0 || scrollingItem.length < 20) {
        sethasMore(false);
      }
      setpage(page + 1);
    }, 1500);


  };

  return (
    <div>
      <h1>react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        // dataLength={this.state.items.length}
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>end</p>}
      >
        {items.map((i, index) => (
          <article style={productsGrid} key={index}>
            <div className="articleItem">
              <img src={i.image} alt={i.name} title={i.name} />
              #{i.id} {i.name}
            </div>
          </article>
        ))}
      </InfiniteScroll>
    </div>
  );

}

export default App;
