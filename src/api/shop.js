import axios from 'axios'
import {
  Loading,
  Cookies,
  LocalStorage,
  Alert
} from 'quasar'
import router from '../router'
const API_URL = process.env.API_SCHEMA + '://' + process.env.API_BASE_URL + '/api/'
const SEARCH = API_URL + 'store/search'
const RESEND = API_URL + 'user/confirmation/resend'
const PRODUCTS = API_URL + 'store/categories/retrieve/'
const UPDATECART = API_URL + 'cart/update/product/quantity'
const USER_RETRIEVE = API_URL + 'user/retrieve'
const STOREINFO = API_URL + 'store/info/retrieve/'
const ACTIVE_CARTS = API_URL + 'carts/retrieve/active'
const CART_REACTIVATE = API_URL + 'cart/re-activate/'
const COMPLETED_CARTS = API_URL + 'carts/retrieve/completed'
const ASSET_IMAGE_UPLOAD = API_URL + 'assets/image/upload'
const ASSET_IMAGE_SEARCH = API_URL + 'assets/image/search/'
const RETRIEVECARTS = API_URL + 'carts/retrieve/active'
const STORE_RETRIEVE_FULL = API_URL + 'store/retrieve/full/'
const STORE_CATEGORIES_RETRIEVE = API_URL + 'store/categories/retrieve/'
const ADDRESS_BOOK_RETRIEVE = API_URL + 'user/address_book/retrieve'
const ADDRESS_BOOK_RETRIEVE_DEFAULT = API_URL + 'user/address_book/retrieve/default'
const ADDRESS_BOOK_ADD = API_URL + 'user/address_book/add'
const ADDRESS_BOOK_DEFAULT_CHANGE = API_URL + 'user/address_book/default/change'
const ADDRESS_BOOK_ADDRESS_REMOVE = API_URL + 'user/address_book/remove_by_id'
const USER_WALLET_RETRIEVE = API_URL + 'user/wallet/retrieve'
const USER_WALLET_ADD = API_URL + 'user/wallet/add?stripe_src='
const REVIEW_PLATFORM_ADD = API_URL + 'review/platform/add'
const REVIEW_STORE_ADD = API_URL + 'review/store/add'
const CATEGORY_CREATE = API_URL + 'store/category/create/'
const CATEGORY_UPDATE = API_URL + 'store/category/update/'
const CATEGORY_PRODUCT_UPDATE = API_URL + 'store/category/product/update/'
const CATEGORY_REORDER = API_URL + 'store/categories/reorder/'
const CATEGORY_PRODUCT_CREATE = API_URL + 'store/category/product/create/'
const STORE_INFO_UPDATE = API_URL + 'store/info/update/'
const PAYMENT_STORE_CREATE = API_URL + 'payment/store/create/account?stripe_src='
const ORDER_CASH_PICKUP = API_URL + 'order/cash/pickup'
const ORDER_CASH_DELIVERY = API_URL + 'order/cash/delivery'
const ORDER_CC_PICKUP = API_URL + 'order/cc/pickup'
const ORDER_CC_DELIVERY = API_URL + 'order/cc/delivery'
const ORDERS_RETRIEVE_ACTIVE = API_URL + 'store/orders/retrieve/active/all/'
const CART_ABANDOM = API_URL + 'cart/abandon/'
const ORDER_STATUS_UPDATE = API_URL + 'order/status/update'
const USER_ORDERS_ACTIVE = API_URL + 'user/orders/active/retrieve'
const HELPER_ORDER_STATUS_PARH = API_URL + 'helper/order/status/path'
const STORE_CATEGORY_PRODUCTS_REORDER = API_URL + 'store/category/products/reorder/'
const STORE_CART_RETRIEVE = API_URL + 'store/cart/retrieve/'
const TEMPLATE_CATEGORIES_T1 = API_URL + 'template/categories/t1'
const TEMPLATE_CATEGORIES_T2 = API_URL + 'template/categories/t2?category_id='
axios.defaults.headers.common['authtoken'] = Cookies.get('authtoken')
const CATEGORIES_FROM_TEMPLATE_ADD = API_URL + 'store/categories/from_template/add'
const PRODUCTS_FROM_TEMPLATE = API_URL + 'template/category/t2/products?category_id='
const STORE_CATEGORY_PRODUCTS_CREATE = API_URL + 'store/products/create?category_id='
const STORE_CATEGORY_PRODUCTS_RETRIEVE = API_URL + 'store/category/products/retrieve?p='
const STORE_CATEGORIES_RETRIEVE_T1 = API_URL + 'store/categories/retrieve/t1?store_id='
const PRODUCT_TEMPLATE_RETRIEVE = API_URL + 'template/product/retrieve?id='
const SEND_EMAIL = API_URL + 'send_email'
axios.defaults.headers.common['userID'] = Cookies.get('userID')

export default {
  API_URL,
  ASSET_IMAGE_UPLOAD,
  ASSET_IMAGE_SEARCH,
  getProducts (id, cb) {
    Loading.show()
    axios.get(PRODUCTS + id).then(response => {
      Loading.hide()
      cb(response.data)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  getStores (address, cb) {
    Loading.show()
    if (address.longitude && address.latitude) {
      axios.get(SEARCH, {
        params: {
          lon: address.longitude,
          lat: address.latitude,
          time: 900
        }
      }).then(response => {
        Loading.hide()
        cb(response.data)
      }).catch(function (error) {
        console.log(error)
        const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
        setTimeout(alert.dismiss, 5000)
        Loading.hide()
      })
    }
    else {
      Loading.hide()
    }
  },
  getActiveCarts (cb) {
    axios.get(ACTIVE_CARTS).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
      if (error.response.status === 403) {
        Cookies.remove('userID')
        Cookies.remove('authtoken')
        LocalStorage.remove('authtoken')
        this.$store.commit('authenticationFalse')
        router.push('/login')
      }
    })
  },
  resendPassword (creds) {
    Loading.show()
    axios.get(RESEND, {
      params: {
        'email': creds.email,
        'password': creds.password
      }
    }).then(response => {
      Loading.hide()
    }).catch(function (error) {
      Loading.hide()
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  userInfo (cb) {
    axios.get(USER_RETRIEVE).then(function (response) {
      cb(response.data)
    }).catch(function (error) {
      console.log(error)
      if (error.response.status === 403) {
        Cookies.remove('userID')
        Cookies.remove('authtoken')
        LocalStorage.remove('authtoken')
        this.$store.commit('authenticationFalse')
        console.log('no permission for user info')
        router.push('/login')
      }
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  storeInfo (id, cb) {
    axios.get(STOREINFO + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  updateCart (product, cb, errorCb) {
    axios.post(UPDATECART, JSON.stringify({
      store_id: product.store_id,
      product_id: product.product_id,
      cart_id: product.cart_id,
      quantity: product.quantity,
      is_new_cart: product.is_new_cart,
      instructions: ''
    })).then(response => {
      cb(response.data)
    }).catch(function (error) {
      errorCb(error)
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  retrieveCarts (cb) {
    axios.get(RETRIEVECARTS).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  reactivateCart (id) {
    return axios.get(CART_REACTIVATE + id)
  },
  retrieveCompletedCarts (cb) {
    axios.get(COMPLETED_CARTS).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  storeInfoFull (id, cb) {
    axios.get(STORE_RETRIEVE_FULL + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  storeCategoriesRetrieve (id, cb) {
    axios.get(STORE_CATEGORIES_RETRIEVE + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  retrieveAddressBook (cb) {
    axios.get(ADDRESS_BOOK_RETRIEVE).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  retrieveAddressBookDefualt (cb) {
    axios.get(ADDRESS_BOOK_RETRIEVE_DEFAULT).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  changeDefaultAddress (id, cb) {
    axios.get(ADDRESS_BOOK_DEFAULT_CHANGE + '?address_id=' + id).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  removeAddressByID (id) {
    return axios.get(ADDRESS_BOOK_ADDRESS_REMOVE + '?address_id=' + id)
  },
  userWalletRetrieve (cb) {
    axios.get(USER_WALLET_RETRIEVE).then(response => {
      cb(response.data)
      // console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  userWalletAdd (id) {
    return axios.get(USER_WALLET_ADD + id)
  },
  addAddress (cb, address) {
    axios.post(ADDRESS_BOOK_ADD, address).then(response => {
      cb(response.data)
    }).catch(error => {
      console.log(error)
      const alert = Alert.create({html: error.response.data.message, color: 'red-7'})
      setTimeout(alert.dismiss, 5000)
    })
  },
  addPlatformReview (review) {
    return axios.post(REVIEW_PLATFORM_ADD, JSON.stringify({
      username: review.username,
      comment: review.comment,
      score: review.score
    }))
  },
  addStoreReview (review) {
    return axios.post(REVIEW_STORE_ADD, JSON.stringify({
      username: review.username,
      comment: review.comment,
      score: review.score,
      store_id: review.store_id
    }))
  },
  createCategory (payload) {
    return axios.post(CATEGORY_CREATE + payload.store_id, JSON.stringify({
      category_id: '',
      name: payload.name,
      store_id: payload.store_id,
      sort_order: 0,
      enabled: true
    }))
  },
  updateCategory (payload) {
    return axios.post(CATEGORY_UPDATE + payload.store_id, JSON.stringify({
      category_id: payload.category_id,
      name: payload.name,
      store_id: payload.store_id,
      sort_order: 0,
      enabled: true
    }))
  },
  reorderCategories (payload) {
    return axios.post(CATEGORY_REORDER + payload.store_id, JSON.stringify({
      category_ids: payload.category_ids,
      store_id: payload.store_id
    }))
  },
  categoryProductCreate (payload) {
    return axios.post(CATEGORY_PRODUCT_CREATE + payload.store_id, JSON.stringify({
      image: payload.image,
      asset_id: payload.asset_id,
      enabled: true,
      sort_order: 0,
      store_id: payload.store_id,
      price_cents: payload.price_cents,
      category_id: payload.category_id,
      description: payload.description,
      title: payload.title,
      display_price: String(payload.display_price),
      ProductRatings: {
        total_reviews: 0,
        review_percent: 0
      }
    }))
  },
  updateStoreInfo (payload) {
    var storePayload = payload
    Object.keys(storePayload.working_hours).forEach(function (key) {
      var from = new Date(storePayload.working_hours[key].hours.from)
      var to = new Date(storePayload.working_hours[key].hours.to)
      console.log(from.getHours() * 100 + from.getMinutes())
      console.log(to.getHours() * 100 + to.getMinutes())
      storePayload.working_hours[key].hours = {
        from: from.getHours() * 100 + from.getMinutes(),
        to: to.getHours() * 100 + to.getMinutes()
      }
    })
    return axios.post(STORE_INFO_UPDATE + storePayload.store_id, JSON.stringify(storePayload))
  },
  paymentStoreCreate (payload) {
    return axios.post(PAYMENT_STORE_CREATE + payload.token, JSON.stringify(payload))
  },
  storeProductsReorder (payload) {
    return axios.post(STORE_CATEGORY_PRODUCTS_REORDER + payload.store_id, JSON.stringify(payload))
  },
  categoryProductUpdate (payload) {
    return axios.post(CATEGORY_PRODUCT_UPDATE + payload.store_id, JSON.stringify(payload))
  },
  ordersRetrieveActive (id) {
    return axios.get(ORDERS_RETRIEVE_ACTIVE + id)
  },
  storeCartRetrieve (id) {
    return axios.get(STORE_CART_RETRIEVE + id)
  },
  orderCashPickup (payload) {
    return axios.post(ORDER_CASH_PICKUP, JSON.stringify(payload))
  },
  orderCashDelivery (payload) {
    return axios.post(ORDER_CASH_DELIVERY, JSON.stringify(payload))
  },
  orderCCPickup (payload) {
    return axios.post(ORDER_CC_PICKUP, JSON.stringify(payload))
  },
  orderCCDelivery (payload) {
    return axios.post(ORDER_CC_DELIVERY, JSON.stringify(payload))
  },
  cartAbandon (id) {
    return axios.get(CART_ABANDOM + id)
  },
  userOrderRetrieve () {
    return axios.get(USER_ORDERS_ACTIVE)
  },
  orderStatusUpdate (payload) {
    return axios.post(ORDER_STATUS_UPDATE, JSON.stringify(payload))
  },
  helperOrderStatusPath () {
    return axios.get(HELPER_ORDER_STATUS_PARH)
  },
  templateCategoriesT1 () {
    return axios.get(TEMPLATE_CATEGORIES_T1)
  },
  templateCategoriesT2 (id) {
    return axios.get(TEMPLATE_CATEGORIES_T2 + id)
  },
  templateProducts (id, page) {
    return axios.get(PRODUCTS_FROM_TEMPLATE + id + '&p=' + page)
  },
  storeCategoryProductsRetrieve (categoryID, page) {
    return axios.get(STORE_CATEGORY_PRODUCTS_RETRIEVE + page + '&category_id=' + categoryID)
  },
  storeCategoriesRetrieveT1 (id) {
    return axios.get(STORE_CATEGORIES_RETRIEVE_T1 + id)
  },
  productTemplateRetrieve (id) {
    return axios.get(PRODUCT_TEMPLATE_RETRIEVE + id)
  },
  templateCategoriesAdd (payload) {
    return axios.post(CATEGORIES_FROM_TEMPLATE_ADD, JSON.stringify(payload))
  },
  sendEmail (payload) {
    return axios.post(SEND_EMAIL, JSON.stringify(payload))
  },
  productCreate (payload, categoryID) {
    return axios.post(STORE_CATEGORY_PRODUCTS_CREATE + categoryID, JSON.stringify(payload))
  }
  //  buyProducts (products, cb, errorCb) {
//    setTimeout(() => {
//      // simulate random checkout failure.
//      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
//        ? cb()
//        : errorCb()
//    }, 100)
//  }
}
