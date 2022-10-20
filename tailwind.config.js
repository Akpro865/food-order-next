/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  	"./pages/index.js",
  	"./components/Navbar/Navbar.js",
    "./components/Footer/Footer.js",
    "./components/Featured/Featured.js",
    "./components/FoodCard/FoodCard.js",
    "./components/FoodList/FoodList.js",
    "./components/ImgSlide/ImgSlide.js",
    "./components/CashOnDelivery/CashOnDelivery.js",
    "./pages/item/[id].js",
    "./pages/cart.js",
    "./pages/contact.js",
    "./pages/order/[id].js",
    "./pages/admin/index.js",
    "./pages/admin/create.js",
    "./pages/admin/login.js",
  ],
  theme: {
    extend: {
    	colors: {
    		"app-color": "var(--app-color)",
        "background-color-light": "var(--background-color-light)"
    	},
      
    },
  },
  plugins: [],
}
