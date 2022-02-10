import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

function App({ widget }) {
  const fetchUrl = widget.getAttribute("data-url");
  // const lang = widget.getAttribute("data-lang");

  // const fetchUrl = "rickandmortyapi.com/api/character/?page";
  // console.log("lang", lang);
  // console.log("endpoint:", fetchUrl, "/ lang:", lang);

  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  // const [page, setpage] = useState(1);
  const [page, setpage] = useState(2);
  console.log("page-first", page);


  useEffect(async () => {
    const getFirstProducts = async () => {
      const res = await fetch(`https://${fetchUrl}=1`);
      const dataJson = await res.json();
      const data = dataJson.results;
      setItems(data);
      console.log("page-first 2", page);
    }
    getFirstProducts();
    console.log("page-first 3", page);
  }, []);

  const getFetchProducts = async () => {
    console.log("getFetchProducts page:", page);
    const res = await fetch(`https://${fetchUrl}=${page}`);
    const dataJson = await res.json();
    const data = dataJson.results;
    return data;
  };

  const fetchDataNext = async () => {
    console.log("fetchDataNext page-first fd 4", page);
    setTimeout(async () => {
      const scrollingItem = await getFetchProducts();
      console.log("scrollingItem:", scrollingItem);

      setItems([...items, ...scrollingItem]);
      setpage(Number(page) + 1);

      if (scrollingItem.length === 0 || scrollingItem.length < 20) {
        sethasMore(false);
      }

    }, 900);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchDataNext}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>end</p>}
      className="infiniteScroll"
    >
      {items.map((i, index) => (
        <article className="article" key={index}>
          <div className="inner">
            <img src={i.image} alt={i.name} title={i.name} /><strong>#{i.id}</strong> {i.name}
          </div>
        </article>
      ))}
    </InfiniteScroll>
  );
};

export default App;
