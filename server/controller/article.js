import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "dbtravel_301",
});

export const getArticle = async (req, res) => {
  await connection.query("SELECT * FROM article", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.status(200).send(data);
  });
};

export const getOneArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }
  await connection.query(
    "SELECT * FROM article WHERE article.id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).send(data);
    }
  );
};

export const postArticle = async (req, res) => {
  if (!req.body) {
    return;
  }
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const imageURL = req.body.imageURL;

  await connection.query(
    "INSERT INTO article(title,description,category,imageURL) VALUES(?,?,?,?)",
    [title, description, category, imageURL],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Article Created!" });
    }
  );
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }

  await connection.query(
    "DELETE FROM comments WHERE articleId = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );

  await connection.query(
    "DELETE FROM article WHERE id = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ status: "success", message: "Article Deleted" });
    }
  );
};

export const updateArticle = async (req, res) => {
  if (!req.body) {
    return;
  }
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const imageURL = req.body.imageURL;

  await connection.query(
    "UPDATE article SET title = ?, description = ?, category=?, imageURL = ? WHERE id = ?",
    [title, description, category, imageURL, id],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Article Updated!" });
    }
  );
};

export const getComments = async (req, res) => {
  const id = req.params.id;
  await connection.query(
    "SELECT comments.id, comments.comment, users.username FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.articleId = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).send(data);
    }
  );
};

export const postComment = async (req, res) => {
  if (!req.body) {
    return;
  }
  const comment = req.body.comment;
  const articleId = req.body.articleId;
  const userId = req.body.userId;

  await connection.query(
    "INSERT INTO comments(comment, articleId, userId) VALUES(?,?,?)",
    [comment, articleId, userId],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Comment Added!" });
    }
  );
};

export const deleteComment = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }

  await connection.query(
    "DELETE FROM comments WHERE id = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Comment Deleted" });
    }
  );
};
