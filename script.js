// ========================================
// FOODIE - Food Delivery App JavaScript
// Swiggy/Zomato Clone
// ========================================

// ========================================
// App State
// ========================================
const state = {
    currentPage: 'home',
    currentRestaurant: null,
    cart: JSON.parse(localStorage.getItem('foodie_cart')) || {
        restaurantId: null,
        restaurantName: '',
        items: []
    },
    filters: {
        cuisines: [],
        rating: null,
        search: ''
    }
};

// ========================================
// Cuisine Data
// ========================================
const cuisines = [
    { id: 'north-indian', name: 'North Indian', emoji: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300' },
    { id: 'south-indian', name: 'South Indian', emoji: '🥘', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300' },
    { id: 'chinese', name: 'Chinese', emoji: '🥡', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300' },
    { id: 'italian', name: 'Italian', emoji: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
    { id: 'american', name: 'American', emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
    { id: 'japanese', name: 'Japanese', emoji: '🍣', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300' },
    { id: 'mexican', name: 'Mexican', emoji: '🌮', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
    { id: 'thai', name: 'Thai', emoji: '🍜', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300' }
];

// ========================================
// Restaurant Data (10 Restaurants)
// ========================================
const restaurants = [
    {
        id: 1,
        name: 'Taj Mahal Kitchen',
        cuisine: 'North Indian',
        cuisineId: 'north-indian',
        rating: 4.5,
        deliveryTime: '30-40 min',
        priceForTwo: 500,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        offer: '50% OFF up to ₹100',
        location: 'Connaught Place',
        menu: {
            'Starters': [
                { id: 101, name: 'Paneer Tikka', price: 249, veg: true, description: 'Cottage cheese marinated in spices and grilled to perfection', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300' },
                { id: 102, name: 'Chicken Seekh Kebab', price: 299, veg: false, description: 'Minced chicken kebabs with aromatic spices', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300' },
                { id: 103, name: 'Tandoori Mushroom', price: 199, veg: true, description: 'Fresh mushrooms marinated and cooked in tandoor', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300' }
            ],
            'Main Course': [
                { id: 104, name: 'Butter Chicken', price: 349, veg: false, description: 'Tender chicken in rich tomato and butter gravy', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300' },
                { id: 105, name: 'Dal Makhani', price: 249, veg: true, description: 'Creamy black lentils slow-cooked overnight', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300' },
                { id: 106, name: 'Paneer Butter Masala', price: 279, veg: true, description: 'Soft paneer cubes in creamy tomato gravy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300' }
            ],
            'Breads': [
                { id: 107, name: 'Butter Naan', price: 49, veg: true, description: 'Soft leavened bread with butter', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' },
                { id: 108, name: 'Garlic Naan', price: 59, veg: true, description: 'Naan topped with garlic and coriander', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' }
            ]
        }
    },
    {
        id: 2,
        name: 'Pizza Paradise',
        cuisine: 'Italian',
        cuisineId: 'italian',
        rating: 4.3,
        deliveryTime: '25-35 min',
        priceForTwo: 600,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        offer: 'FREE Delivery',
        location: 'Hauz Khas',
        menu: {
            'Pizzas': [
                { id: 201, name: 'Margherita Pizza', price: 299, veg: true, description: 'Classic pizza with fresh mozzarella and basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
                { id: 202, name: 'Pepperoni Pizza', price: 399, veg: false, description: 'Loaded with spicy pepperoni slices', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
                { id: 203, name: 'BBQ Chicken Pizza', price: 449, veg: false, description: 'BBQ sauce base with grilled chicken', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
                { id: 204, name: 'Veggie Supreme', price: 349, veg: true, description: 'Loaded with fresh vegetables', image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=300' }
            ],
            'Pasta': [
                { id: 205, name: 'Spaghetti Carbonara', price: 329, veg: false, description: 'Creamy pasta with bacon and parmesan', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300' },
                { id: 206, name: 'Penne Arrabbiata', price: 279, veg: true, description: 'Spicy tomato sauce pasta', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300' }
            ],
            'Sides': [
                { id: 207, name: 'Garlic Bread', price: 149, veg: true, description: 'Crispy bread with garlic butter', image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300' },
                { id: 208, name: 'Cheesy Fries', price: 179, veg: true, description: 'Fries loaded with cheese', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' }
            ]
        }
    },
    {
        id: 3,
        name: 'Dragon Wok',
        cuisine: 'Chinese',
        cuisineId: 'chinese',
        rating: 4.2,
        deliveryTime: '35-45 min',
        priceForTwo: 450,
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
        offer: '20% OFF on orders above ₹500',
        location: 'Rajouri Garden',
        menu: {
            'Starters': [
                { id: 301, name: 'Spring Rolls', price: 179, veg: true, description: 'Crispy rolls stuffed with vegetables', image: 'https://images.unsplash.com/photo-1606525437679-037aca74a8c5?w=300' },
                { id: 302, name: 'Chicken Manchurian', price: 249, veg: false, description: 'Deep-fried chicken in manchurian sauce', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300' },
                { id: 303, name: 'Chilli Paneer', price: 229, veg: true, description: 'Spicy paneer with bell peppers', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300' }
            ],
            'Rice & Noodles': [
                { id: 304, name: 'Veg Fried Rice', price: 199, veg: true, description: 'Wok-tossed rice with vegetables', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' },
                { id: 305, name: 'Chicken Hakka Noodles', price: 249, veg: false, description: 'Stir-fried noodles with chicken', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300' },
                { id: 306, name: 'Schezwan Fried Rice', price: 219, veg: true, description: 'Spicy rice with schezwan sauce', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' }
            ],
            'Main Course': [
                { id: 307, name: 'Kung Pao Chicken', price: 299, veg: false, description: 'Chicken with peanuts in spicy sauce', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300' },
                { id: 308, name: 'Veg in Hot Garlic Sauce', price: 249, veg: true, description: 'Mixed vegetables in garlic sauce', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300' }
            ]
        }
    },
    {
        id: 4,
        name: 'Spice Route',
        cuisine: 'South Indian',
        cuisineId: 'south-indian',
        rating: 4.6,
        deliveryTime: '20-30 min',
        priceForTwo: 350,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
        offer: 'Buy 1 Get 1 on Dosas',
        location: 'Lajpat Nagar',
        menu: {
            'Dosas': [
                { id: 401, name: 'Masala Dosa', price: 129, veg: true, description: 'Crispy dosa with potato filling', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300' },
                { id: 402, name: 'Mysore Masala Dosa', price: 149, veg: true, description: 'Spicy dosa with red chutney', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300' },
                { id: 403, name: 'Rava Dosa', price: 139, veg: true, description: 'Crispy semolina dosa', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300' }
            ],
            'Idli & Vada': [
                { id: 404, name: 'Idli Sambar', price: 99, veg: true, description: 'Steamed rice cakes with sambar', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300' },
                { id: 405, name: 'Medu Vada', price: 89, veg: true, description: 'Crispy lentil donuts', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300' },
                { id: 406, name: 'Idli Vada Combo', price: 149, veg: true, description: '2 Idli + 2 Vada with sambar & chutney', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300' }
            ],
            'Uttapam': [
                { id: 407, name: 'Onion Uttapam', price: 119, veg: true, description: 'Thick pancake topped with onions', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300' },
                { id: 408, name: 'Mixed Veg Uttapam', price: 139, veg: true, description: 'Uttapam with mixed vegetables', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300' }
            ]
        }
    },
    {
        id: 5,
        name: 'Burger Barn',
        cuisine: 'American',
        cuisineId: 'american',
        rating: 4.1,
        deliveryTime: '25-35 min',
        priceForTwo: 550,
        image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600',
        offer: 'FREE Coke with any Burger',
        location: 'Saket',
        menu: {
            'Burgers': [
                { id: 501, name: 'Classic Cheese Burger', price: 199, veg: false, description: 'Juicy beef patty with melted cheese', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
                { id: 502, name: 'Veggie Burger', price: 179, veg: true, description: 'Crispy veg patty with fresh veggies', image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?w=300' },
                { id: 503, name: 'BBQ Bacon Burger', price: 279, veg: false, description: 'Loaded with bacon and BBQ sauce', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300' },
                { id: 504, name: 'Mushroom Swiss Burger', price: 249, veg: true, description: 'Sautéed mushrooms with swiss cheese', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300' }
            ],
            'Sides': [
                { id: 505, name: 'French Fries', price: 99, veg: true, description: 'Crispy golden fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
                { id: 506, name: 'Onion Rings', price: 129, veg: true, description: 'Crispy battered onion rings', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300' }
            ],
            'Beverages': [
                { id: 507, name: 'Chocolate Shake', price: 149, veg: true, description: 'Rich chocolate milkshake', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300' },
                { id: 508, name: 'Oreo Shake', price: 169, veg: true, description: 'Creamy oreo milkshake', image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?w=300' }
            ]
        }
    },
    {
        id: 6,
        name: 'Sushi Sensation',
        cuisine: 'Japanese',
        cuisineId: 'japanese',
        rating: 4.7,
        deliveryTime: '40-50 min',
        priceForTwo: 900,
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875b6aa?w=600',
        offer: '15% OFF on first order',
        location: 'Khan Market',
        menu: {
            'Sushi Rolls': [
                { id: 601, name: 'California Roll', price: 399, veg: false, description: 'Crab, avocado, and cucumber roll', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300' },
                { id: 602, name: 'Salmon Nigiri', price: 449, veg: false, description: 'Fresh salmon on seasoned rice', image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300' },
                { id: 603, name: 'Veg Tempura Roll', price: 349, veg: true, description: 'Crispy vegetable tempura roll', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300' }
            ],
            'Ramen': [
                { id: 604, name: 'Tonkotsu Ramen', price: 499, veg: false, description: 'Rich pork bone broth ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300' },
                { id: 605, name: 'Miso Ramen', price: 449, veg: true, description: 'Fermented soybean broth ramen', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300' }
            ],
            'Appetizers': [
                { id: 606, name: 'Edamame', price: 199, veg: true, description: 'Salted steamed soybeans', image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300' },
                { id: 607, name: 'Gyoza', price: 279, veg: false, description: 'Pan-fried Japanese dumplings', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300' }
            ]
        }
    },
    {
        id: 7,
        name: 'Curry House',
        cuisine: 'North Indian',
        cuisineId: 'north-indian',
        rating: 4.4,
        deliveryTime: '30-40 min',
        priceForTwo: 400,
        image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600',
        offer: '₹75 OFF on orders above ₹299',
        location: 'Karol Bagh',
        menu: {
            'Curries': [
                { id: 701, name: 'Chicken Curry', price: 289, veg: false, description: 'Home-style chicken curry', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300' },
                { id: 702, name: 'Palak Paneer', price: 249, veg: true, description: 'Cottage cheese in spinach gravy', image: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=300' },
                { id: 703, name: 'Mutton Rogan Josh', price: 399, veg: false, description: 'Kashmiri style mutton curry', image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=300' }
            ],
            'Biryani': [
                { id: 704, name: 'Chicken Biryani', price: 299, veg: false, description: 'Fragrant basmati rice with spiced chicken', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300' },
                { id: 705, name: 'Veg Biryani', price: 249, veg: true, description: 'Aromatic rice with mixed vegetables', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300' }
            ],
            'Breads': [
                { id: 706, name: 'Roomali Roti', price: 39, veg: true, description: 'Thin handkerchief bread', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' },
                { id: 707, name: 'Laccha Paratha', price: 49, veg: true, description: 'Layered flaky flatbread', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' }
            ]
        }
    },
    {
        id: 8,
        name: 'Taco Town',
        cuisine: 'Mexican',
        cuisineId: 'mexican',
        rating: 4.0,
        deliveryTime: '25-35 min',
        priceForTwo: 500,
        image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600',
        offer: 'Taco Tuesday: Buy 2 Get 1 FREE',
        location: 'Vasant Kunj',
        menu: {
            'Tacos': [
                { id: 801, name: 'Chicken Tacos', price: 229, veg: false, description: 'Soft tacos with grilled chicken', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
                { id: 802, name: 'Veggie Tacos', price: 199, veg: true, description: 'Fresh vegetable tacos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300' },
                { id: 803, name: 'Beef Tacos', price: 279, veg: false, description: 'Seasoned beef tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' }
            ],
            'Burritos': [
                { id: 804, name: 'Chicken Burrito', price: 299, veg: false, description: 'Loaded chicken burrito', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' },
                { id: 805, name: 'Bean Burrito', price: 249, veg: true, description: 'Black bean and rice burrito', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300' }
            ],
            'Sides': [
                { id: 806, name: 'Nachos Supreme', price: 229, veg: true, description: 'Loaded nachos with cheese and salsa', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300' },
                { id: 807, name: 'Guacamole & Chips', price: 179, veg: true, description: 'Fresh guacamole with tortilla chips', image: 'https://images.unsplash.com/photo-1600891965050-25ef0e1d0d40?w=300' }
            ]
        }
    },
    {
        id: 9,
        name: 'Mediterranean Grill',
        cuisine: 'Mediterranean',
        cuisineId: 'mediterranean',
        rating: 4.5,
        deliveryTime: '35-45 min',
        priceForTwo: 700,
        image: 'https://images.unsplash.com/photo-1544025162-d76978e5e0a2?w=600',
        offer: 'Complimentary Hummus',
        location: 'Defence Colony',
        menu: {
            'Grills': [
                { id: 901, name: 'Chicken Shawarma', price: 249, veg: false, description: 'Spiced grilled chicken wrap', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300' },
                { id: 902, name: 'Lamb Kofta', price: 349, veg: false, description: 'Grilled lamb skewers', image: 'https://images.unsplash.com/photo-1544025162-d76978e5e0a2?w=300' },
                { id: 903, name: 'Falafel Plate', price: 279, veg: true, description: 'Crispy chickpea falafel with hummus', image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=300' }
            ],
            'Mezze': [
                { id: 904, name: 'Hummus', price: 179, veg: true, description: 'Creamy chickpea dip', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d967?w=300' },
                { id: 905, name: 'Baba Ganoush', price: 199, veg: true, description: 'Smoky eggplant dip', image: 'https://images.unsplash.com/photo-1541013406133-94ed77ee8ba8?w=300' },
                { id: 906, name: 'Mixed Mezze Platter', price: 399, veg: true, description: 'Assortment of mezze dips', image: 'https://images.unsplash.com/photo-1544250141-c68a5f9e4b7d?w=300' }
            ],
            'Mains': [
                { id: 907, name: 'Chicken Kebab Plate', price: 399, veg: false, description: 'Grilled chicken with rice and salad', image: 'https://images.unsplash.com/photo-1544250141-c68a5f9e4b7d?w=300' }
            ]
        }
    },
    {
        id: 10,
        name: 'Thai Orchid',
        cuisine: 'Thai',
        cuisineId: 'thai',
        rating: 4.3,
        deliveryTime: '30-40 min',
        priceForTwo: 650,
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
        offer: '10% OFF on all Thai Curries',
        location: 'Greater Kailash',
        menu: {
            'Curries': [
                { id: 1001, name: 'Green Curry', price: 349, veg: true, description: 'Thai green curry with vegetables', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300' },
                { id: 1002, name: 'Red Curry Chicken', price: 399, veg: false, description: 'Spicy red curry with chicken', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300' },
                { id: 1003, name: 'Massaman Curry', price: 379, veg: false, description: 'Mild curry with potatoes and peanuts', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300' }
            ],
            'Noodles': [
                { id: 1004, name: 'Pad Thai', price: 299, veg: true, description: 'Stir-fried rice noodles', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300' },
                { id: 1005, name: 'Drunken Noodles', price: 329, veg: false, description: 'Spicy wide rice noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300' }
            ],
            'Rice': [
                { id: 1006, name: 'Thai Fried Rice', price: 249, veg: true, description: 'Jasmine rice with Thai flavors', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' },
                { id: 1007, name: 'Basil Chicken Rice', price: 299, veg: false, description: 'Thai basil chicken with rice', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300' }
            ]
        }
    }
];

// ========================================
// DOM Elements
// ========================================
const elements = {
    navbar: document.getElementById('navbar'),
    landingPage: document.getElementById('landingPage'),
    restaurantsPage: document.getElementById('restaurantsPage'),
    restaurantDetailPage: document.getElementById('restaurantDetailPage'),
    cuisinesGrid: document.getElementById('cuisinesGrid'),
    featuredGrid: document.getElementById('featuredGrid'),
    restaurantsGrid: document.getElementById('restaurantsGrid'),
    cuisineFilters: document.getElementById('cuisineFilters'),
    searchInput: document.getElementById('searchInput'),
    cartBtn: document.getElementById('cartBtn'),
    cartBadge: document.getElementById('cartBadge'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItems: document.getElementById('cartItems'),
    cartEmpty: document.getElementById('cartEmpty'),
    cartRestaurant: document.getElementById('cartRestaurant'),
    cartRestaurantName: document.getElementById('cartRestaurantName'),
    cartFooter: document.getElementById('cartFooter'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDeliveryFee: document.getElementById('cartDeliveryFee'),
    cartTax: document.getElementById('cartTax'),
    cartTotal: document.getElementById('cartTotal'),
    checkoutModal: document.getElementById('checkoutModal'),
    orderItems: document.getElementById('orderItems'),
    orderTotal: document.getElementById('orderTotal')
};

// ========================================
// Initialize App
// ========================================
function init() {
    renderCuisines();
    renderFeaturedRestaurants();
    renderRestaurants();
    renderCuisineFilters();
    updateCartUI();
    bindEvents();
}

// ========================================
// Render Functions
// ========================================
function renderCuisines() {
    elements.cuisinesGrid.innerHTML = cuisines.map(cuisine => `
        <div class="cuisine-card" data-cuisine="${cuisine.id}">
            <span class="cuisine-emoji">${cuisine.emoji}</span>
            <span class="cuisine-name">${cuisine.name}</span>
        </div>
    `).join('');
}

function renderFeaturedRestaurants() {
    const featured = restaurants.slice(0, 4);
    elements.featuredGrid.innerHTML = featured.map(restaurant => `
        <div class="restaurant-preview-card" data-id="${restaurant.id}">
            <div class="restaurant-preview-img">
                <img src="${restaurant.image}" alt="${restaurant.name}" loading="lazy">
                <span class="restaurant-offer">${restaurant.offer}</span>
            </div>
            <div class="restaurant-preview-info">
                <div class="restaurant-preview-header">
                    <h3 class="restaurant-preview-name">${restaurant.name}</h3>
                    <span class="restaurant-rating">⭐ ${restaurant.rating}</span>
                </div>
                <div class="restaurant-preview-meta">
                    <span>${restaurant.cuisine}</span>
                    <span>•</span>
                    <span>⏱️ ${restaurant.deliveryTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRestaurants() {
    let filtered = [...restaurants];

    // Apply cuisine filter
    if (state.filters.cuisines.length > 0) {
        filtered = filtered.filter(r => state.filters.cuisines.includes(r.cuisineId));
    }

    // Apply rating filter
    if (state.filters.rating) {
        filtered = filtered.filter(r => r.rating >= state.filters.rating);
    }

    // Apply search filter
    if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(search) ||
            r.cuisine.toLowerCase().includes(search)
        );
    }

    elements.restaurantsGrid.innerHTML = filtered.map(restaurant => `
        <div class="restaurant-card" data-id="${restaurant.id}">
            <div class="restaurant-img">
                <img src="${restaurant.image}" alt="${restaurant.name}" loading="lazy">
                <span class="restaurant-badge">Promoted</span>
                <span class="restaurant-time">${restaurant.deliveryTime}</span>
            </div>
            <div class="restaurant-info">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <span class="restaurant-rating">⭐ ${restaurant.rating}</span>
                </div>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-footer">
                    <span class="restaurant-price">₹${restaurant.priceForTwo} for two</span>
                    <span class="restaurant-delivery">🚀 Free Delivery</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCuisineFilters() {
    const uniqueCuisines = [...new Set(restaurants.map(r => r.cuisine))];
    elements.cuisineFilters.innerHTML = uniqueCuisines.map(cuisine => `
        <label class="filter-option" data-cuisine="${cuisine.toLowerCase().replace(' ', '-')}">
            <span class="filter-checkbox"></span>
            <span>${cuisine}</span>
        </label>
    `).join('');
}

function renderRestaurantDetail(restaurant) {
    // Update banner
    document.getElementById('restaurantBannerImg').src = restaurant.image;
    document.getElementById('restaurantDetailName').textContent = restaurant.name;
    document.getElementById('restaurantDetailCuisine').textContent = restaurant.cuisine;
    document.getElementById('restaurantDetailLocation').textContent = restaurant.location;
    document.getElementById('restaurantDetailTime').textContent = restaurant.deliveryTime;
    document.getElementById('restaurantDetailRating').innerHTML = `⭐ ${restaurant.rating}`;

    // Render categories nav
    const categories = Object.keys(restaurant.menu);
    document.getElementById('categoryNav').innerHTML = categories.map((cat, i) => `
        <a href="#${cat.toLowerCase().replace(' ', '-')}" class="category-link ${i === 0 ? 'active' : ''}">${cat}</a>
    `).join('');

    // Render menu items
    let menuHTML = '';
    for (const [category, items] of Object.entries(restaurant.menu)) {
        menuHTML += `
            <div id="${category.toLowerCase().replace(' ', '-')}">
                <h2>${category}</h2>
                <div class="menu-items">
                    ${items.map(item => renderMenuItem(item, restaurant)).join('')}
                </div>
            </div>
        `;
    }
    document.getElementById('menuContent').innerHTML = menuHTML;
}

function renderMenuItem(item, restaurant) {
    const cartItem = state.cart.items.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return `
        <div class="menu-item" data-item-id="${item.id}">
            <div class="menu-item-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-info">
                <div class="menu-item-header">
                    <span class="veg-indicator ${item.veg ? 'veg' : 'non-veg'}"></span>
                    <span class="menu-item-name">${item.name}</span>
                </div>
                <div class="menu-item-price">₹${item.price}</div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-actions">
                    ${quantity > 0 ? `
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">−</button>
                            <span class="quantity-value">${quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}" data-restaurant="${restaurant.id}">+</button>
                        </div>
                    ` : `
                        <button class="add-btn" data-id="${item.id}" data-restaurant="${restaurant.id}">Add +</button>
                    `}
                </div>
            </div>
        </div>
    `;
}

function updateCartUI() {
    const itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartBadge.textContent = itemCount;
    elements.cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';

    if (state.cart.items.length === 0) {
        elements.cartEmpty.style.display = 'flex';
        elements.cartRestaurant.style.display = 'none';
        elements.cartFooter.style.display = 'none';
        elements.cartItems.innerHTML = '';
        elements.cartItems.appendChild(elements.cartEmpty);
    } else {
        elements.cartEmpty.style.display = 'none';
        elements.cartRestaurant.style.display = 'flex';
        elements.cartFooter.style.display = 'block';
        elements.cartRestaurantName.textContent = state.cart.restaurantName;

        elements.cartItems.innerHTML = state.cart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <div class="cart-item-total">₹${item.price * item.quantity}</div>
                    <div class="cart-item-controls">
                        <button data-action="decrease" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button data-action="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Calculate totals
        const subtotal = state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 40;
        const tax = Math.round(subtotal * 0.05);
        const total = subtotal + deliveryFee + tax;

        elements.cartSubtotal.textContent = `₹${subtotal}`;
        elements.cartDeliveryFee.textContent = `₹${deliveryFee}`;
        elements.cartTax.textContent = `₹${tax}`;
        elements.cartTotal.textContent = `₹${total}`;
    }

    // Save to localStorage
    localStorage.setItem('foodie_cart', JSON.stringify(state.cart));
}

// ========================================
// Cart Functions
// ========================================
function addToCart(itemId, restaurantId) {
    const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    let item = null;

    for (const category of Object.values(restaurant.menu)) {
        item = category.find(i => i.id === parseInt(itemId));
        if (item) break;
    }

    if (!item) return;

    // Check if adding from different restaurant
    if (state.cart.restaurantId && state.cart.restaurantId !== restaurant.id && state.cart.items.length > 0) {
        if (confirm('Your cart contains items from another restaurant. Do you want to clear it and add items from this restaurant?')) {
            state.cart.items = [];
        } else {
            return;
        }
    }

    state.cart.restaurantId = restaurant.id;
    state.cart.restaurantName = restaurant.name;

    const existingItem = state.cart.items.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    updateCartUI();
    if (state.currentRestaurant) {
        renderRestaurantDetail(state.currentRestaurant);
    }
}

function updateCartQuantity(itemId, action) {
    const item = state.cart.items.find(i => i.id === parseInt(itemId));
    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            state.cart.items = state.cart.items.filter(i => i.id !== item.id);
        }
    }

    if (state.cart.items.length === 0) {
        state.cart.restaurantId = null;
        state.cart.restaurantName = '';
    }

    updateCartUI();
    if (state.currentRestaurant) {
        renderRestaurantDetail(state.currentRestaurant);
    }
}

// ========================================
// Navigation Functions
// ========================================
function navigateTo(page) {
    state.currentPage = page;
    elements.landingPage.classList.add('hidden');
    elements.restaurantsPage.classList.add('hidden');
    elements.restaurantDetailPage.classList.add('hidden');

    switch (page) {
        case 'home':
            elements.landingPage.classList.remove('hidden');
            break;
        case 'restaurants':
            elements.restaurantsPage.classList.remove('hidden');
            break;
        case 'restaurant-detail':
            elements.restaurantDetailPage.classList.remove('hidden');
            break;
    }

    window.scrollTo(0, 0);
    updateNavLinks();
}

function updateNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === state.currentPage) {
            link.classList.add('active');
        }
    });
}

function openRestaurant(restaurantId) {
    const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    if (!restaurant) return;

    state.currentRestaurant = restaurant;
    renderRestaurantDetail(restaurant);
    navigateTo('restaurant-detail');
}

function toggleCart(show) {
    if (show) {
        elements.cartSidebar.classList.add('active');
        elements.cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        elements.cartSidebar.classList.remove('active');
        elements.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function checkout() {
    if (state.cart.items.length === 0) return;

    // Populate order summary
    elements.orderItems.innerHTML = state.cart.items.map(item => `
        <div class="order-item">
            <span>${item.name} x${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
    `).join('');

    const subtotal = state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 40 + Math.round(subtotal * 0.05);
    elements.orderTotal.textContent = `₹${total}`;

    // Clear cart
    state.cart = {
        restaurantId: null,
        restaurantName: '',
        items: []
    };
    updateCartUI();

    // Close cart and show modal
    toggleCart(false);
    elements.checkoutModal.classList.add('active');
}

// ========================================
// Event Bindings
// ========================================
function bindEvents() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    });

    // Navigation links
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Home link
    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
    });

    // Order Now buttons
    document.getElementById('orderNowBtn').addEventListener('click', () => navigateTo('restaurants'));
    document.getElementById('ctaOrderBtn').addEventListener('click', () => navigateTo('restaurants'));

    // Back buttons
    document.getElementById('backToHome').addEventListener('click', () => navigateTo('home'));
    document.getElementById('backToRestaurants').addEventListener('click', () => navigateTo('restaurants'));

    // Restaurant cards click (featured)
    elements.featuredGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.restaurant-preview-card');
        if (card) openRestaurant(card.dataset.id);
    });

    // Restaurant cards click (listing)
    elements.restaurantsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.restaurant-card');
        if (card) openRestaurant(card.dataset.id);
    });

    // Cuisine cards click
    elements.cuisinesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.cuisine-card');
        if (card) {
            state.filters.cuisines = [card.dataset.cuisine];
            navigateTo('restaurants');
            renderRestaurants();
            updateFilterUI();
        }
    });

    // Add to cart
    document.getElementById('menuContent').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            addToCart(e.target.dataset.id, e.target.dataset.restaurant);
        }
        if (e.target.classList.contains('quantity-btn')) {
            const action = e.target.classList.contains('plus') ? 'increase' : 'decrease';
            updateCartQuantity(e.target.dataset.id, action);
        }
    });

    // Cart sidebar
    elements.cartBtn.addEventListener('click', () => toggleCart(true));
    document.getElementById('cartClose').addEventListener('click', () => toggleCart(false));
    elements.cartOverlay.addEventListener('click', () => toggleCart(false));

    // Cart item controls
    elements.cartItems.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (btn) {
            updateCartQuantity(btn.dataset.id, btn.dataset.action);
        }
    });

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Checkout modal
    document.getElementById('checkoutModalOverlay').addEventListener('click', () => {
        elements.checkoutModal.classList.remove('active');
    });
    document.getElementById('continueBtn').addEventListener('click', () => {
        elements.checkoutModal.classList.remove('active');
        navigateTo('restaurants');
    });
    document.getElementById('trackOrderBtn').addEventListener('click', () => {
        elements.checkoutModal.classList.remove('active');
        alert('Order tracking coming soon! Your order ID: #FD' + Math.floor(Math.random() * 100000));
    });

    // Search
    elements.searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        renderRestaurants();
    });

    // Cuisine filters
    elements.cuisineFilters.addEventListener('click', (e) => {
        const option = e.target.closest('.filter-option');
        if (option) {
            option.classList.toggle('active');
            const cuisineId = option.dataset.cuisine;

            if (option.classList.contains('active')) {
                if (!state.filters.cuisines.includes(cuisineId)) {
                    state.filters.cuisines.push(cuisineId);
                }
            } else {
                state.filters.cuisines = state.filters.cuisines.filter(c => c !== cuisineId);
            }

            renderRestaurants();
        }
    });

    // Rating filters
    document.getElementById('ratingFilters').addEventListener('click', (e) => {
        const option = e.target.closest('.filter-option');
        if (option) {
            // Toggle off if already selected
            if (option.classList.contains('active')) {
                option.classList.remove('active');
                state.filters.rating = null;
            } else {
                // Remove active from all
                document.querySelectorAll('#ratingFilters .filter-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                state.filters.rating = parseFloat(option.dataset.rating);
            }
            renderRestaurants();
        }
    });

    // Category nav scroll
    document.getElementById('categoryNav').addEventListener('click', (e) => {
        const link = e.target.closest('.category-link');
        if (link) {
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

function updateFilterUI() {
    document.querySelectorAll('#cuisineFilters .filter-option').forEach(option => {
        if (state.filters.cuisines.includes(option.dataset.cuisine)) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// ========================================
// Start App
// ========================================
document.addEventListener('DOMContentLoaded', init);
