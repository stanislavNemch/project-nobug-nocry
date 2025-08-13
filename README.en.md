# Team Project "Mebleria"

This is a landing page for the furniture store **"Mebleria"**. The site allows
users to view the furniture assortment, filter products by category, get
detailed information about a product, read reviews, and place an order through a
feedback form.

## Technology Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Libraries:**
  - **Swiper.js** (for sliders in the "Reviews" and "Popular Products" sections)
  - **izitoast** (for pop-up notifications about successful orders or errors)
  - **accordion** (for implementing functionality in the FAQ section)
  - **css-star-rating / raty-js** (for displaying ratings as stars)

## Project Structure and Functionality

The project consists of the following functional blocks:

- **Header:** Site navigation, logo, and a burger menu for mobile devices.
- **Hero Section:** The main screen with an offer and a call to action.
- **About Us Section:** Brief information about the company.
- **Furniture List Section:** A product catalog with filtering and "load more"
  capabilities.
- **Popular Products Section:** A slider with the most popular products.
- **FAQ Section:** An accordion with answers to frequently asked questions.
- **Feedback Section:** A slider with customer reviews.
- **Footer:** Additional navigation, contacts, and links to social media.
- **"Product Details" Modal:** Detailed information about a selected product.
- **"Order" Modal:** A form for placing an order.

---

## Team and Task Distribution

### **Stanislav Nemchenko** (Team Lead)

**Area of Responsibility:**

- **Header:** Implemented navigation, smooth scrolling to sections, an adaptive
  burger menu that blocks page scrolling when open and closes on a link click,
  outside the menu, or with the `Escape` key.
- **Popular Products:** Created the section, fetched data from the backend
  (`/furniture?type=popular`), implemented a product card slider using
  `Swiper.js` with navigation.
- **Reviews:** Developed the section, fetched data from (`/feedbacks`),
  implemented a review slider using `Swiper.js`, displayed star ratings, and
  synchronized it with pagination.

### **Dmytro Voitovych** (Scrum Master)

**Area of Responsibility:**

- **Furniture Details Modal:** Created a modal window that opens on a product
  card click. The window contains an image gallery, description, price, rating,
  and color selection. Implemented closing the modal (button, click outside,
  `Escape` key) and blocking page scroll. The "Proceed to Order" button opens
  the order form modal.

### **Yaroslav Pron** (Developer)

**Area of Responsibility:**

- **Hero Section:** Layout and styling of the main screen with a title,
  description, and a "What they think about us" button, which is an anchor link
  to the reviews section.

### **Andriy Abrosenkov** (Developer) & **Artem Proskurovskyi** (Developer)

**Area of Responsibility:**

- **Furniture List Section:** Implemented dynamic display of product cards
  fetched from the backend (`/furniture`). Developed logic for filtering
  products by category. Implemented a "Load More" button to load the next batch
  of products.

### **Lina Khatsko** (Developer)

**Area of Responsibility:**

- **About Us Section:** Layout and styling of the section with a content image,
  title, and descriptive text.
- **Popular Products:** Collaborated on the section.

### **Daria Tsevashova** (Developer)

**Area of Responsibility:**

- **FAQ Section:** Implemented the section as an accordion, where clicking on a
  question smoothly expands the answer. Only one answer can be open at a time.

### **Maryna Prushak** (Developer)

**Area of Responsibility:**

- **Feedback Section:** Collaborated on the section.
- **Footer:** Layout and styling of the footer, containing the logo, copyright,
  navigation, and links to social media that open in a new tab.

### **Denys Hamzinov** (Developer)

**Area of Responsibility:**

- **Order Modal:** Created a modal window with a form (name, phone, comment).
  Implemented field validation and sending a POST request to `/orders` with form
  data and product information. Integrated the `izitoast` library to show
  success or error messages.

---

## How to Run the Project

1.  **Clone the repository:**

    ```bash
    git clone https://your-repo-url.com/project.git
    ```

2.  **Navigate to the project folder:**

    ```bash
    cd project
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the project in development mode:**
    ```bash
    npm run dev
    ```
    (or another command specified in `package.json`)

After this, the project will be available at the local address specified in your
terminal (usually `http://localhost:xxxx`).
