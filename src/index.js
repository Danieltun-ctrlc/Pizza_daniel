import react, { useState } from "react";
import reactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    id: 1,
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
    fav: true,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
    fav: false,
  },
  {
    id: 3,
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
    fav: true,
  },
  {
    id: 4,
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
    fav: true,
  },
  {
    id: 5,
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
    fav: true,
  },
  {
    id: 6,
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
    fav: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Htoo Lay Guitar's Pizza Menu</h1>
    </header>
  );
}

function Menu() {
  const [price, setprice] = useState("100");
  const [sold, sets] = useState("all");
  const [isFavorites, setIsFavorites] = useState(false);
  const [pizzas, setPizzas] = useState(pizzaData);
  const [user_input, setUserInput] = useState("");

  const toggleView = () => {
    setIsFavorites(!isFavorites);
  };

  const handleChange = (event) => {
    setprice(event.target.value);
  };

  const handleSold = (event) => {
    sets(event.target.value);
  };

  const toggleFav = (id) => {

    setPizzas(
      (prev) => prev.map((p) => (p.id === id ? { ...p, fav: !p.fav } : p)) // ← update immutably
    );
  };

  const handleUser = (e) => {

      if (e.target.value === "") {

          setUserInput("");
      } else {

          setUserInput(e.target.value);
      }
  }

  return (
    <div className="menu">
      <h2 className="menu-header">Our menu</h2>
      <div className="filters">
        <div>
          <h3>Select a price range:</h3>
          <select value={price} onChange={handleChange}>
            <option value="100">-- Choose --</option>
            <option value="7">less than 7</option>
            <option value="11">less than 11</option>
            <option value="15">less than 15</option>
            <option value="19"> less than 19</option>
          </select>

          <p>You selected: {price}</p>
        </div>
        <div>
          <h3>Select the having restock or not:</h3>
          <select value={sold} onChange={handleSold}>
            <option value="all">-- Choose --</option>
            <option value="true">no stock</option>
            <option value="false">stocks</option>
          </select>

          <p>You selected: {sold}</p>
        </div>
        <div className="toggle-container">
          <span className={`toggle-label ${!isFavorites ? "active" : ""}`}>
            All
          </span>

          <button
            onClick={toggleView}
            className={`toggle-button ${isFavorites ? "favorites" : "all"}`}
            aria-label="Toggle view"
          >
            <div className="toggle-circle">
              {!isFavorites && (
                <div className="icon-grid">
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                </div>
              )}

              {isFavorites && (
                <svg
                  className="icon-heart"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            <div className="indicator-dot"></div>

            {isFavorites && (
              <div className="sparkles">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
                <div className="sparkle sparkle-3"></div>
              </div>
            )}
          </button>

          <span className={`toggle-label ${isFavorites ? "active" : ""}`}>
            Favorites
          </span>
        </div>
          <input  className="input" value={user_input} onChange={handleUser} type="text" />
      </div>

      <div className="pizzas">
        {sold === "all"
          ? isFavorites
            ? pizzas
                .filter((pizza) => pizza.price < parseInt(price) && pizza.fav).filter((pizza) => (
                    pizza.name.toLowerCase().includes(user_input)
                    ))
                .map((item, index) => {
                  console.log({ item });
                  return (
                    <Pizza
                      name={item.name}
                      key={item.id}
                      image={item.photoName}
                      description={item.ingredients}
                      price={item.price}
                      soldOut={item.soldOut}
                      id={item.id}
                      fav={item.fav}
                      onHeartClick={() => toggleFav(item.id)}
                    />
                  );
                })
            : pizzas
                .filter((pizza) => pizza.price < parseInt(price)).filter((pizza) => (
                        pizza.name.toLowerCase().includes(user_input)
                    ))
                .map((item, index) => (
                  <Pizza
                    name={item.name}
                    key={item.id}
                    image={item.photoName}
                    description={item.ingredients}
                    price={item.price}
                    soldOut={item.soldOut}
                    id={item.id}
                    fav={item.fav}
                    onHeartClick={() => toggleFav(item.id)}
                  />
                ))
          : isFavorites
          ? pizzas
              .filter(
                (pizza) =>
                  pizza.price < parseInt(price) &&
                  pizza.soldOut === (sold === "true") &&
                  pizza.fav
              ).filter((pizza) => (
                        pizza.name.toLowerCase().includes(user_input)
                    ))
              .map((item, index) => (
                <Pizza
                  key={item.id}
                  name={item.name}
                  image={item.photoName}
                  description={item.ingredients}
                  price={item.price}
                  soldOut={item.soldOut}
                  fav={item.fav}
                  id={item.id}
                  onHeartClick={() => toggleFav(item.id)}
                />
              ))
          : pizzas
              .filter(
                (pizza) =>
                  pizza.price < parseInt(price) &&
                  pizza.soldOut === (sold === "true")
              ).filter((pizza) => (
                        pizza.name.toLowerCase().includes(user_input)
                    ))
              .map((item, index) => (
                <Pizza
                  key={item.id}
                  name={item.name}
                  image={item.photoName}
                  description={item.ingredients}
                  price={item.price}
                  soldOut={item.soldOut}
                  fav={item.fav}
                  id={item.id}
                  onHeartClick={() => toggleFav(item.id)}
                />
              ))}
      </div>
    </div>
  );
}

function Footer() {
  let hours_now = new Date().getHours();
  return (
    <footer>
      {hours_now >= 10 && hours_now < 22
        ? "We 're currently open right now!"
        : "we are closed"}
    </footer>
  );
}
function heartfilled(id, fac, setfac) {
  alert(id);
  pizzaData.forEach((pizza) => {
    if (pizza.id === id) {
      pizza.fav = pizza.fav ? false : true;
      setfac(pizza.fav ? "heart filled" : "heart outline");
    }
  });
}

function Pizza({
  id,
  name,
  image,
  description,
  price,
  soldOut,
  fav,
  onHeartClick,
}) {
  console.log(fav ? "yes" : "no");
  const heartClass = fav ? "heart filled" : "heart outline";
  let nice = "";
  if (fav) {
    nice = "heart filled";
  } else {
    nice = "heart outline";
  }
  console.log(nice + "whatf the ff");

  return (
    <div className={soldOut ? "pizza sold-out" : "pizza"}>
      <div className="pizza-info">
        <div className="pizza-header">
          <h3>{name}</h3>
          <h3>{fav ? "okay" : "leepl"}</h3>
          <span className={heartClass} onClick={onHeartClick}>
            ♥
          </span>
        </div>

        <img src={image} alt={name} />
        <p>Ingredients - {description}</p>
        <span>Price - ${price}</span>
      </div>

      <h4 className="restock">
        still have the restock? : {!soldOut ? "Yes" : "No"}
      </h4>
    </div>
  );
}

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(
  <react.StrictMode>
    <App />
  </react.StrictMode>
);
