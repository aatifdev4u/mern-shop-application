import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Row, Col, Card, Button} from 'antd';
import ImageSlider from '../../utils/ImageSlider';
const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();

    const getProducts = (payload)=>{
        Axios.post('/api/product/getProduct', payload)
        .then(response => {
            if(response.data.success){
                setProducts(response.data.products);
                setPostSize(response.data.postSize);
                console.log(response.data.products);
            }else{
                alert('Failed to fetch products')
            }
        })
    }

    useEffect(()=>{

        let payload = {
            skip: Skip,
            limit: Limit
        }

        getProducts(payload);
    }, [])

    const renderProducts = Products.map((product, index)=> (
       
            <Col lg={6} md={8} sm={24}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={ <ImageSlider images={product.images} />}
            >
                <Meta title={product.title} description={`$${product.price}`} />
            </Card>
            </Col>

       
    ))

    const onLoadMore = ()=>{
        let skip = Skip + Limit;
        let payload = {
            skip: Skip,
            limit: Limit
        }

        getProducts(payload)

        setSkip(skip);
    }

    return (
        <div style={{ width: '75%', margin: '2rem auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <h1 style={{ textAlign: 'center'}}>Hey Where would you Travel</h1>
            </div>

            <div>
                <Row gutter={[16, 16]}>
                    {Products ? renderProducts : <div>No Post</div>}
                </Row>
            </div>

            {
                PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onLoadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
