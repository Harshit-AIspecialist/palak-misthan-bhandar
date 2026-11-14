import { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
      }
    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const savedCart = JSON.parse(localStorage.getItem('pmb_cart') || '{"items":[]}')
  const [state, dispatch] = useReducer(cartReducer, savedCart)

  useEffect(() => {
    localStorage.setItem('pmb_cart', JSON.stringify(state))
  }, [state])

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } })
    toast.success(`${product.name} added to cart! 🛒`)
  }

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalAmount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
