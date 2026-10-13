import { useEffect, useState } from "react";
import "./App.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    category: "Indian",
    rating: 4.8,
    time: 25,
    price: 250,
    offer: "20% OFF",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 101, name: "Chicken Biryani", price: 220, image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80" },
      { id: 102, name: "Paneer Butter Masala", price: 190, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80" },
      { id: 103, name: "Butter Naan", price: 40, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: 2,
    name: "Burger House",
    category: "Fast Food",
    rating: 4.6,
    time: 20,
    price: 180,
    offer: "FREE DELIVERY",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 201, name: "Classic Cheeseburger", price: 160, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
      { id: 202, name: "Double Beef Burger", price: 220, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" },
      { id: 203, name: "French Fries", price: 90, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: 3,
    name: "Pizza Corner",
    category: "Pizza",
    rating: 4.7,
    time: 30,
    price: 300,
    offer: "15% OFF",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 301, name: "Margherita Pizza", price: 249, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80" },
      { id: 302, name: "Pepperoni Pizza", price: 329, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80" },
      { id: 303, name: "Garlic Bread", price: 110, image: "https://images.unsplash.com/photo-1619531040576-f9416740661e?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: 4,
    name: "Sweet Treats",
    category: "Desserts",
    rating: 4.5,
    time: 15,
    price: 150,
    offer: "BUY 1 GET 1",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 401, name: "Chocolate Cake", price: 140, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
      { id: 402, name: "Chocolate Donut", price: 80, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
      { id: 403, name: "Ice Cream", price: 100, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: 5,
    name: "Healthy Bowl",
    category: "Healthy",
    rating: 4.9,
    time: 20,
    price: 220,
    offer: "HEALTHY DEAL",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 501, name: "Fresh Salad Bowl", price: 180, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" },
      { id: 502, name: "Avocado Toast", price: 160, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
      { id: 503, name: "Fruit Bowl", price: 130, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    id: 6,
    name: "Dosa Palace",
    category: "Indian",
    rating: 4.6,
    time: 18,
    price: 120,
    offer: "10% OFF",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=85",
    menu: [
      { id: 601, name: "Masala Dosa", price: 100, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80" },
      { id: 602, name: "Idli Sambar", price: 70, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80" },
      { id: 603, name: "Plain Dosa", price: 80, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80" }
    ]
  }
];

const categories = ["All", "Indian", "Fast Food", "Pizza", "Desserts", "Healthy"];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [fastDelivery, setFastDelivery] = useState(false);
  const [minRating, setMinRating] = useState(false);
  const [selected, setSelected] = useState(null);

  const [cart, setCart] = useState(() => readStorage("my-restaurant-cart", []));
  const [favorites, setFavorites] = useState(() => readStorage("my-restaurant-favorites", []));
  const [orders, setOrders] = useState(() => readStorage("my-restaurant-orders", []));

  const [notice, setNotice] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    localStorage.setItem("my-restaurant-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("my-restaurant-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("my-restaurant-orders", JSON.stringify(orders));
  }, [orders]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function goHome() {
    setPage("home");
    setSelected(null);
    setSearch("");
    setCategory("All");
    setSort("recommended");
    setFastDelivery(false);
    setMinRating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function exploreRestaurants() {
    goHome();
    window.setTimeout(() => {
      document.getElementById("restaurants")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  }

  function openRestaurant(restaurant) {
    setSelected(restaurant);
    setPage("restaurant");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function addToCart(restaurant, food) {
    setCart((current) => {
      const existing = current.find((item) => item.id === food.id);

      if (existing) {
        return current.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          ...food,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          quantity: 1
        }
      ];
    });

    showNotice(`${food.name} added to cart!`);
  }

  function changeQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.menu.some((food) =>
          food.name.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory =
        category === "All" || restaurant.category === category;

      const matchesDelivery = !fastDelivery || restaurant.time <= 20;
      const matchesRating = !minRating || restaurant.rating >= 4.7;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDelivery &&
        matchesRating
      );
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "time") return a.time - b.time;
      if (sort === "price") return a.price - b.price;
      return 0;
    });

  function checkout() {
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      showNotice("Please fill in all delivery details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(customer.phone.trim())) {
      showNotice("Enter a valid 10-digit phone number.");
      return;
    }

    if (cart.length === 0) {
      showNotice("Your cart is empty.");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toLocaleString(),
      customer: { ...customer },
      status: "Order placed"
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    setPage("orders");
    setCustomer({ name: "", phone: "", address: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    showNotice("Your demo order has been placed!");
  }

  function RestaurantCard({ restaurant }) {
    const isFavorite = favorites.includes(restaurant.id);

    return (
      <article className="restaurant-card">
        <div className="restaurant-image-wrap">
          <button
            className="restaurant-image-button"
            onClick={() => openRestaurant(restaurant)}
            aria-label={`View ${restaurant.name}`}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-photo"
              loading="lazy"
            />
          </button>

          <span className="offer-tag">{restaurant.offer}</span>

          <button
            className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
            onClick={() => toggleFavorite(restaurant.id)}
            aria-label="Toggle favorite"
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          <span className="delivery-tag">{restaurant.time} min</span>
        </div>

        <div className="restaurant-info">
          <div className="restaurant-title-row">
            <h3>{restaurant.name}</h3>
            <span className="rating">★ {restaurant.rating}</span>
          </div>

          <p className="muted">
            {restaurant.category} · ₹{restaurant.price} for one
          </p>

          <div className="restaurant-bottom">
            <span className="muted">Fresh food, delivered fast</span>

            <button
              className="text-button"
              onClick={() => openRestaurant(restaurant)}
            >
              View menu →
            </button>
          </div>
        </div>
      </article>
    );
  }

  function RestaurantGrid({ items }) {
    if (items.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>No restaurants found</h3>
          <p>Try another search or clear your filters.</p>
          <button className="primary-button" onClick={goHome}>
            Clear filters
          </button>
        </div>
      );
    }

    return (
      <div className="restaurant-grid">
        {items.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={goHome}>
          <span className="brand-icon">M</span>
          <span>
            My <span className="brand-accent">Restaurant</span>
          </span>
        </button>

        <nav className="nav-links">
          <button
            className={page === "home" ? "nav-active" : ""}
            onClick={goHome}
          >
            Home
          </button>

          <button
            className={page === "favorites" ? "nav-active" : ""}
            onClick={() => setPage("favorites")}
          >
            Favorites
          </button>

          <button
            className={page === "orders" ? "nav-active" : ""}
            onClick={() => setPage("orders")}
          >
            My Orders
          </button>
        </nav>

        <button className="cart-button" onClick={() => setPage("cart")}>
          <span>🛒</span> Cart
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      {notice && <div className="toast">{notice}</div>}

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">GOOD FOOD. GOOD MOOD.</span>
              <h1>
                Your cravings,
                <br />
                our <span>delivery.</span>
              </h1>

              <p>
                Discover delicious meals from your favorite restaurants.
                Freshly prepared and delivered to your doorstep.
              </p>

              <button className="hero-button" onClick={exploreRestaurants}>
                Explore restaurants <span>→</span>
              </button>

              <div className="hero-stats">
                <div>
                  <strong>50+</strong>
                  <span>Food choices</span>
                </div>
                <div>
                  <strong>20 min</strong>
                  <span>Fast delivery</span>
                </div>
                <div>
                  <strong>4.8 ★</strong>
                  <span>Happy customers</span>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
                alt="Freshly prepared delicious food"
              />

              <div className="hero-floating-card">
                <span className="floating-check">✓</span>
                <div>
                  <strong>Fresh & tasty</strong>
                  <p>Made just for you</p>
                </div>
              </div>
            </div>
          </section>

          <section className="benefits">
            <div>
              <span>🚴</span>
              <div>
                <strong>Fast delivery</strong>
                <p>Meals at your door</p>
              </div>
            </div>

            <div>
              <span>🥗</span>
              <div>
                <strong>Fresh ingredients</strong>
                <p>Quality in every bite</p>
              </div>
            </div>

            <div>
              <span>💳</span>
              <div>
                <strong>Easy ordering</strong>
                <p>Simple and secure demo</p>
              </div>
            </div>
          </section>

          <section className="restaurants-section" id="restaurants">
            <div className="section-heading">
              <div>
                <span className="eyebrow">WHAT ARE YOU CRAVING?</span>
                <h2>Explore restaurants</h2>
                <p>Find something delicious for every mood.</p>
              </div>

              <span className="results-count">
                {filteredRestaurants.length} restaurants
              </span>
            </div>

            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search restaurants, dishes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")}>×</button>
              )}
            </div>

            <div className="filter-row">
              <div className="category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`category-chip ${
                      category === item ? "selected" : ""
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Top rated</option>
                <option value="time">Fast delivery</option>
                <option value="price">Price: low to high</option>
              </select>
            </div>

            <div className="extra-filters">
              <label>
                <input
                  type="checkbox"
                  checked={fastDelivery}
                  onChange={(event) =>
                    setFastDelivery(event.target.checked)
                  }
                />
                Delivery in 20 minutes or less
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={minRating}
                  onChange={(event) => setMinRating(event.target.checked)}
                />
                Rating 4.7+
              </label>
            </div>

            <RestaurantGrid items={filteredRestaurants} />
          </section>

          <section className="promo-banner">
            <div>
              <span className="eyebrow">A LITTLE SOMETHING EXTRA</span>
              <h2>Good food tastes even better with a deal.</h2>
              <p>Discover offers across your favorite restaurants.</p>
              <button
                className="primary-button"
                onClick={exploreRestaurants}
              >
                Start exploring →
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"
              alt="A colorful spread of food"
              loading="lazy"
            />
          </section>
        </>
      )}

      {page === "restaurant" && selected && (
        <main className="page-container">
          <button className="back-button" onClick={goHome}>
            ← Back to restaurants
          </button>

          <div className="restaurant-detail-hero">
            <img src={selected.image} alt={selected.name} />
            <div>
              <span className="eyebrow">{selected.category}</span>
              <h1>{selected.name}</h1>
              <p className="muted">Delicious food prepared fresh for you.</p>

              <div className="detail-meta">
                <span className="rating">★ {selected.rating}</span>
                <span>{selected.time} min delivery</span>
                <span>₹{selected.price} for one</span>
              </div>
            </div>
          </div>

          <div className="section-heading menu-heading">
            <div>
              <h2>Our menu</h2>
              <p>Choose your favorites and add them to your cart.</p>
            </div>
          </div>

          <div className="food-grid">
            {selected.menu.map((food) => (
              <article className="food-card" key={food.id}>
                <img src={food.image} alt={food.name} loading="lazy" />

                <div className="food-card-info">
                  <h3>{food.name}</h3>
                  <p>Freshly prepared</p>

                  <div className="food-card-bottom">
                    <strong>₹{food.price}</strong>
                    <button
                      className="add-button"
                      onClick={() => addToCart(selected, food)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="center-action">
            <button
              className="primary-button"
              onClick={() => setPage("cart")}
            >
              View cart ({cartCount}) →
            </button>
          </div>
        </main>
      )}

      {page === "favorites" && (
        <main className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SAVED FOR LATER</span>
              <h2>Your favorites</h2>
              <p>Restaurants you love, all in one place.</p>
            </div>
          </div>

          <RestaurantGrid
            items={restaurants.filter((item) =>
              favorites.includes(item.id)
            )}
          />

          <button className="back-button" onClick={exploreRestaurants}>
            ← Explore more restaurants
          </button>
        </main>
      )}

      {page === "cart" && (
        <main className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ALMOST THERE</span>
              <h2>Your cart</h2>
              <p>Review your order before checking out.</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Find a delicious meal to get started.</p>
              <button
                className="primary-button"
                onClick={exploreRestaurants}
              >
                Explore restaurants
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p className="muted">{item.restaurantName}</p>
                      <strong>₹{item.price}</strong>
                    </div>

                    <div className="quantity-control">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))}

                <button
                  className="back-button"
                  onClick={exploreRestaurants}
                >
                  ＋ Add more items
                </button>
              </div>

              <aside className="bill-card">
                <h3>Bill details</h3>
                <div>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div>
                  <span>Delivery fee</span>
                  <span>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div>
                  <span>Taxes (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="bill-total">
                  <strong>Total</strong>
                  <strong>₹{total}</strong>
                </div>

                {subtotal < 499 && (
                  <p className="bill-hint">
                    Add ₹{499 - subtotal} more for free delivery.
                  </p>
                )}

                <button
                  className="primary-button full-button"
                  onClick={() => setPage("checkout")}
                >
                  Proceed to checkout →
                </button>
              </aside>
            </div>
          )}
        </main>
      )}

      {page === "checkout" && (
        <main className="page-container">
          <button
            className="back-button"
            onClick={() => setPage("cart")}
          >
            ← Back to cart
          </button>

          <div className="section-heading">
            <div>
              <span className="eyebrow">FINAL STEP</span>
              <h2>Delivery details</h2>
              <p>Fill in your details to place a demo order.</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-state">
              <h3>Your cart is empty</h3>
              <button
                className="primary-button"
                onClick={exploreRestaurants}
              >
                Explore restaurants
              </button>
            </div>
          ) : (
            <div className="checkout-layout">
              <form
                className="checkout-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  checkout();
                }}
              >
                <label>
                  Full name
                  <input
                    required
                    value={customer.name}
                    onChange={(event) =>
                      setCustomer({ ...customer, name: event.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </label>

                <label>
                  Phone number
                  <input
                    required
                    type="tel"
                    maxLength="10"
                    value={customer.phone}
                    onChange={(event) =>
                      setCustomer({ ...customer, phone: event.target.value })
                    }
                    placeholder="10-digit phone number"
                  />
                </label>

                <label>
                  Delivery address
                  <textarea
                    required
                    rows="4"
                    value={customer.address}
                    onChange={(event) =>
                      setCustomer({ ...customer, address: event.target.value })
                    }
                    placeholder="House number, street, city..."
                  />
                </label>

                <p className="demo-note">
                  This is a frontend demo. No real payment will be processed.
                </p>

                <button
                  className="primary-button full-button"
                  type="submit"
                >
                  Place demo order · ₹{total}
                </button>
              </form>

              <aside className="bill-card">
                <h3>Order summary</h3>

                {cart.map((item) => (
                  <div key={item.id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <div>
                  <span>Delivery fee</span>
                  <span>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                <div>
                  <span>Taxes</span>
                  <span>₹{tax}</span>
                </div>

                <div className="bill-total">
                  <strong>Total</strong>
                  <strong>₹{total}</strong>
                </div>
              </aside>
            </div>
          )}
        </main>
      )}

      {page === "orders" && (
        <main className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR FOOD JOURNEY</span>
              <h2>My orders</h2>
              <p>See your orders placed in this demo.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🧾</div>
              <h3>No orders yet</h3>
              <p>Your placed orders will appear here.</p>
              <button
                className="primary-button"
                onClick={exploreRestaurants}
              >
                Start exploring
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div className="order-top">
                    <div>
                      <span className="eyebrow">
                        ORDER #{String(order.id).slice(-6)}
                      </span>
                      <h3>{order.customer.name}</h3>
                    </div>
                    <span className="order-status">{order.status}</span>
                  </div>

                  <p className="muted">{order.date}</p>

                  <p>
                    {order.items
                      .map((item) => `${item.name} × ${item.quantity}`)
                      .join(", ")}
                  </p>

                  <p className="muted">
                    Deliver to: {order.customer.address}
                  </p>

                  <div className="order-total">
                    <span>Total paid in demo</span>
                    <strong>₹{order.total}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}

          <button className="back-button" onClick={exploreRestaurants}>
            ← Explore restaurants
          </button>
        </main>
      )}

      <footer className="footer">
        <button className="brand footer-brand" onClick={goHome}>
          <span className="brand-icon">M</span>
          <span>
            My <span className="brand-accent">Restaurant</span>
          </span>
        </button>

        <p>Good food, good mood. Made with ♥ for food lovers.</p>

        <button className="footer-link" onClick={exploreRestaurants}>
          Explore restaurants →
        </button>

        <small>
          © {new Date().getFullYear()} My Restaurant · Sannith varimadla project
        </small>
      </footer>
    </div>
  );
}

export default App;