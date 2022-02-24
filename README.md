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
