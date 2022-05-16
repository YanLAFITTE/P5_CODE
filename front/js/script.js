fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(data) {
  data.forEach((couch) => {
    const { _id, imageUrl, altTxt, name, description } = couch;
    const anchor = addAnchor(_id);
    const article = document.createElement("article");
    const image = addImage(imageUrl, altTxt);
    const title = addTitle(name);
    const p = addParagraph(description);

    articleAppendChildElements(article, image, title, p);
    anchorAppendChildArticle(anchor, article);
  });
}

function articleAppendChildElements(article, image, title, p) {
  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(p);
}

function anchorAppendChildArticle(anchor, article) {
  const items = document.querySelector("#items");
  items.appendChild(anchor);
  anchor.appendChild(article);
}

function addAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

function addImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

function addTitle(name) {
  const title = document.createElement("h3");
  title.textContent = name;
  title.classList.add("productName");
  return title;
}

function addParagraph(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}





