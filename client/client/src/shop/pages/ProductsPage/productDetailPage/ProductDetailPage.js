import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import ProductPics from './ProductPics';
import ProductContent from './ProductContent';
import Evaluate from './Evaluate';
import PicDetail from './PicDetail';
import DetailFooter from './DetailFooter';
import { getProductDetail } from '@/api/product';

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetailPic: [],
      productcontent: {},
      detail: {},
      detailPics: [],
      appraisaCount: 1,
      appraisa: {},
      show: true,
      ifAddToShopCart: false,
    };
  }

  componentDidMount() {
    getProductDetail(this.props.match.params.id).then(res => {
      if (Object.keys(res.data.data.appraisa).length === 0) { // 当没有评论的时候
        this.setState({ show: false });
      } else { // 当有评论的时候
        this.setState({ show: true });
      }
      this.setState({
        productDetailPic: res.data.data.cover,
        productcontent: res.data.data,
        detailPics: res.data.data.detail,
        detail: res.data.data,
        appraisaCount: res.data.data.appraisaCount,
        appraisa: res.data.data.appraisa,
        ifAddToShopCart: true, // 拿到数据才去进行购物车和立即购买的操作（标志）
      });
    });
  }
  render() {
    const productId = this.props.match.params.id;
    return (
      <DocumentTitle title="商品详情">
        <div className="detailPage">
          <ProductPics data={ this.state.productDetailPic } />
          <ProductContent data={ this.state.productcontent } />
          <Evaluate data={ productId }
            num={ this.state.appraisaCount }
            appraisa={ this.state.appraisa }
            show={ this.state.show }
          />
          <PicDetail data={ this.state.detailPics } />
          <DetailFooter data={ this.state.detail }
            ifAddToShopCart={ this.state.ifAddToShopCart }
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default ProductDetailPage;
