import { createContext, useState, useEffect } from 'react';


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const exisitingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // If it does, then increment quantity
    if (exisitingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem );
    }

    // return new array with modified cartItsm/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // Find cart item to remove
    const exisitingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // If quantity is equal to 1, then remove the item from the cart
    if (exisitingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id === cartItemToRemove.id)
    }

    // Return back cart itmes matching the cart item with the reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem );
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

