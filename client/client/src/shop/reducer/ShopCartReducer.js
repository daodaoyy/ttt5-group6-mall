const defaultState = {
  payload: [],
};

const AddCartReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    // 获取购物车：要判断登录和未登录的购物车相同的商品
    case 'GET_SHOPCART':
      // console.log(state.payload);
      // console.log(action.payload);
      // eslint-disable-next-line no-case-declarations
      if (state.payload.length) {
        const result = state.payload.filter(item => {
          // eslint-disable-next-line prefer-const
          let flag = true;
          for (let i = 0; i < action.payload.length; i++) {
            if (item.id === action.payload[i].id) { // id一样的时候
              flag = false;
              break;
            }
          }
          return flag;
        });
        return {
          ...state,
          payload: result.concat(action.payload),
        };
      }
      return {
        ...state,
        payload: state.payload.concat(action.payload),
      };

    // 清空购物车
    case 'EMPTY_SHOPCART':
      return {
        ...state,
        payload: action.payload,
      };
    // 删除购物车
    case 'DEL_SHOPCART':
      state.payload.forEach((element, index) => {
        if (action.payload === element.id) {
          state.payload.splice(index, 1);
        }
      });
      // console.log(state);
      return state;

    // 购物车数量=>减
    case 'REDUCE_SHOPCART_NUM':
      state.payload.forEach(element => {
        if (action.payload === element.id && element.productNumber > 1) { // action.payload:当前商品的Id
          // eslint-disable-next-line no-param-reassign
          element.productNumber -= 1;
        }
      });
      return state;

    // 购物车数量=>加
    case 'ADD_SHOPCART_NUM':
      state.payload.forEach(element => {
        if (action.payload === element.id) {
          // eslint-disable-next-line no-param-reassign
          element.productNumber += 1;
        }
      });
      return state;

    // 添加商品到购物车
    case 'ADD_SHOPCART':
      // eslint-disable-next-line no-case-declarations
      let flag = true;
      state.payload.forEach(element => {
        if (action.payload.id === element.id) {
          element.productNumber += 1;
          flag = false;
          return state;
        }
      });
      if (flag === true) {
        return {
          ...state,
          payload: state.payload.concat(action.payload),
        };
      }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default AddCartReducer;
