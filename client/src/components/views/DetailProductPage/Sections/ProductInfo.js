import React, { useState, useEffect} from 'react'
import { Descriptions, Button } from 'antd';

function ProductInfo(props) {
    const [Product, setProduct] = useState({})

    useEffect(() => {
       if(props.detail){
        setProduct(props.detail)
       }
    }, [props.detail])

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
                <Descriptions.Item label="Views">{Product.views}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
            </Descriptions>
            <div style={{display: 'flex', justifyContent: 'center', margin: '2rem auto'}}>
                <Button type="primary" danger shape="round">
                    Add To Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
