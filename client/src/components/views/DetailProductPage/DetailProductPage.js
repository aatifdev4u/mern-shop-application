import React, { useState, useEffect} from 'react'
import { Row, Col} from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Axios from 'axios';

function DetailProductPage(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState([]);

    useEffect(() => {
       Axios.get(`/api/product/productId?_id=${productId}&type=single`)
       .then(response => {
            if(response.data){
                console.log(response.data);
                setProduct(response.data[0]);
            }
       })
    }, [])


    return (
        <div  className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2>Product Information</h2>
            </div>
           <Row gutter={[16, 16]}>
               <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
               </Col>
               <Col lg={12} xs={24}>
                    <ProductInfo detail={Product}/>
               </Col>
           </Row>
        </div>
    )
}

export default DetailProductPage
