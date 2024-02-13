import axios from "axios";
import { useEffect, useState } from "react";
import Article from "./Article";

const Home = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/article");
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (article.length === 0) {
    return (
      <div className="mx-auto mt-5 text-center">
        No posts to show! Please contact admin to add article!
      </div>
    );
  }

  return (
    <div className="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
      {article.map((n) => (
        <div key={n.id}>
          <Article data={n} />
        </div>
      ))}
    </div>
  );
};

export default Home;
