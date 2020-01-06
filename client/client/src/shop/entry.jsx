import React from 'react';
import Loadable from 'react-loadable';

const Loading = <div className="assets-loading">Loading...</div>;
// LogPage
const LoadableRegisterPage = Loadable({
  loader: () => import('./pages/LogPage/register/Register'),
  loading: () => Loading,
});
const LoadableSignInPage = Loadable({
  loader: () => import('./pages/LogPage/signIn/SignIn'),
  loading: () => Loading,
});
// Home
const LoadableHomePage = Loadable({
  loader: () => import('./pages/HomePage/home/Home'),
  loading: () => Loading,
});
const LoadableSearchResultPage = Loadable({
  loader: () => import('./pages/HomePage/search/SearchResultPage'),
  loading: () => Loading,
});
const LoadableActivityPage = Loadable({
  loader: () => import('./pages/HomePage/activityPage/ActivityPage'),
  loading: () => Loading,
});
// ProductsPage
const LoadableClassificationProductPage = Loadable({
  loader: () => import('./pages/ProductsPage/classificationProductPage/ClassificationProductPage'),
  loading: () => Loading,
});
const LoadableProductDetailPage = Loadable({
  loader: () => import('./pages/ProductsPage/productDetailPage/ProductDetailPage'),
  loading: () => Loading,
});
const LoadableEvaluateListPage = Loadable({
  loader: () => import('./pages/ProductsPage/evaluateListPage/EvaluateListPage'),
  loading: () => Loading,
});
// OrderPage
const LoadableSubmitOrderPage = Loadable({
  loader: () => import('./pages/OrderPage/submitOrderPage/SubmitOrderPage'),
  loading: () => Loading,
});
// const LoadableSelectAddressPage = Loadable({
//   loader: () => import('./pages/OrderPage/selectAddressPage/SelectAddressPage'),
//   loading: () => Loading,
// });
const LoadableOrderDetailPage = Loadable({
  loader: () => import('./pages/OrderPage/orderDetailPage/OrderDetailPage'),
  loading: () => Loading,
});
const LoadableOrderListPage = Loadable({
  loader: () => import('./pages/OrderPage/orderListPage/OrderListPage'),
  loading: () => Loading,
});
const LoadableEvaluatePage = Loadable({
  loader: () => import('./pages/OrderPage/evaluatePage/EvaluatePage'),
  loading: () => Loading,
});

// CartPage
const LoadableShoppingCartPage = Loadable({
  loader: () => import('./pages/CartPage/shoppingCartPage/ShoppingCartPage'),
  loading: () => Loading,
});
// UserPage
const LoadableForgetPassPage = Loadable({
  loader: () => import('./pages/UserPage/forgetPassPage/ForgetPassPage'),
  loading: () => Loading,
});
const LoadableMyCenterPage = Loadable({
  loader: () => import('./pages/UserPage/myCenterPage/MyCenterPage'),
  loading: () => Loading,
});
const LoadableAboutPage = Loadable({
  loader: () => import('./pages/UserPage/about/About'),
  loading: () => Loading,
});
const LoadableMyInformationPage = Loadable({
  loader: () => import('./pages/UserPage/myInformationPage/MyInformationPage'),
  loading: () => Loading,
});
const LoadableNicknameUpdatePage = Loadable({
  loader: () => import('./pages/UserPage/nicknameUpdatePage/NicknameUpdatePage'),
  loading: () => Loading,
});
const LoadableAutographUpdatePage = Loadable({
  loader: () => import('./pages/UserPage/autographUpdatePage/AutographUpdatePage'),
  loading: () => Loading,
});
const LoadableAccountPage = Loadable({
  loader: () => import('./pages/UserPage/accountPage/AccountPage'),
  loading: () => Loading,
});
const LoadablePhoneUpdatePage = Loadable({
  loader: () => import('./pages/UserPage/phonePage/phoneUpdatePage/PhoneUpdatePage'),
  loading: () => Loading,
});
const LoadablePasswordUpdatePage = Loadable({
  loader: () => import('./pages/UserPage/passwordUpdatePage/PasswordUpdatePage'),
  loading: () => Loading,
});
const LoadableBindNewPhonePage = Loadable({
  loader: () => import('./pages/UserPage/phonePage/bindNewPhonePage/BindNewPhonePage'),
  loading: () => Loading,
});
const LoadableAddressListPage = Loadable({
  loader: () => import('./pages/UserPage/addressPage/addressListPage/AddressListPage'),
  loading: () => Loading,
});
const LoadableAddressUpdatePage = Loadable({
  loader: () => import('./pages/UserPage/addressPage/addressUpdatePage/AddressUpdatePage'),
  loading: () => Loading,
});
const LoadableAddressAddPage = Loadable({
  loader: () => import('./pages/UserPage/addressPage/addressAddPage/AddressAddPage'),
  loading: () => Loading,
});

export {
  LoadableRegisterPage as RegisterPage,
  LoadableSignInPage as SignInPage,
  LoadableForgetPassPage as ForgetPassPage,
  LoadableHomePage as HomePage,
  LoadableSearchResultPage as SearchResultPage,
  LoadableClassificationProductPage as ClassificationProductPage,
  LoadableActivityPage as ActivityPage,
  // LoadableHotProductPage as HotProductPage,
  LoadableProductDetailPage as ProductDetailPage,
  LoadableEvaluateListPage as EvaluateListPage,
  LoadableSubmitOrderPage as SubmitOrderPage,
  // LoadableSelectAddressPage as SelectAddressPage,
  LoadableOrderDetailPage as OrderDetailPage,
  LoadableOrderListPage as OrderListPage,
  LoadableShoppingCartPage as ShoppingCartPage,
  LoadableMyCenterPage as MyCenterPage,
  LoadableAboutPage as AboutPage,
  LoadableMyInformationPage as MyInformationPage,
  LoadableNicknameUpdatePage as NicknameUpdatePage,
  LoadableAutographUpdatePage as AutographUpdatePage,
  LoadableAccountPage as AccountPage,
  LoadablePhoneUpdatePage as PhoneUpdatePage,
  LoadablePasswordUpdatePage as PasswordUpdatePage,
  LoadableBindNewPhonePage as BindNewPhonePage,
  LoadableAddressListPage as AddressListPage,
  LoadableAddressUpdatePage as AddressUpdatePage,
  LoadableAddressAddPage as AddressAddPage,
  LoadableEvaluatePage as EvaluatePage,
};
