import api from './api'

// Products
export const getProducts = (params = {}) => api.get('/products', { params })
export const getFeaturedProducts = () => api.get('/products/featured')
export const getProductById = (id) => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

// Categories
export const getCategories = (all = false) => api.get('/categories', { params: { all } })
export const getCategoryById = (id) => api.get(`/categories/${id}`)
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

// Orders
export const createOrder = (data) => api.post('/orders', data)
export const getAllOrders = () => api.get('/orders')
export const getOrderByNumber = (num) => api.get(`/orders/number/${num}`)
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status })

// Contact
export const submitContact = (data) => api.post('/contact', data)
export const getAllMessages = () => api.get('/contact')
export const markMessageRead = (id) => api.put(`/contact/${id}/read`)

// Auth
export const login = (data) => api.post('/auth/login', data)
export const getCurrentUser = () => api.get('/auth/me')
