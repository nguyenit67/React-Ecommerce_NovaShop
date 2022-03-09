# ReactJS Project

## Folder structure

```
src
|__ components (shared components between features)
|  |__ Loading
|     |__ index.jsx
|     |__ styles.scss
|
|__ features
|  |__ Todo
|     |__ components (components of feature Todo)
|     |__ pages (pages of feature Todo)
|     |__ index.jsx (entry point of feature Todo)
|
|__ App.js
```

FiltersViewer

```js
const filters = {
  isPromotion: true,
  salePrice_lte: 100,
  salePrice_gte: 100,
};
```

FILTER_LIST

- id: number
- getLabel(filters) => string (tạo label)
- isActive: (filters) => true/false (đã chọn hay ko)
- isVisible: (filters) => true/false (hiện lên hoặc bị remove)
- isRemovable: boolean (có xóa bỏ đc ko)
- onRemove: func (khi isRemovable === true)
- onToggle: func (khi isRemovable === false)

MUlTI_TYPE_FILTER (my idea)

- id: number
- getLabel(filters) => string (tạo label)
- type: Component (Component của filter đó)
- onChange (khi filter con đó đổi trạng thái, trigger callback (props.onChange) nhận vào từ component cha)

```
DetailPage handleSubmit
|__ AddToCartForm (validation + values management) (a.k.a form management)
|   |__ QuantityField
```

DetailPage
Click Add to Cart
-> Open Mini Cart
Go to Cart Page

Feature: Cart (Giỏ Hàng)

- showMiniCart: true / false
- cartItems -> item (product, quantity, id:=productId)

State derived from existing state `cartItems`

- cartItemsCount
- cartTotal
  --> createSelector()
