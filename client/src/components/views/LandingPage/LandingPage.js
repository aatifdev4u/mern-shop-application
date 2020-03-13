import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Row, Col, Card, Button} from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchBox from './Sections/SearchBox';
import { price } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();
    const [SearchTerm, setSearchTerm] = useState('')
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(()=>{

        let payload = {
            skip: Skip,
            limit: Limit
        }

        getProducts(payload);
    }, [])

    const getProducts = (payload)=>{
        Axios.post('/api/product/getProduct', payload)
        .then(response => {
            if(response.data.success){
                if(payload.loadMore){
                    console.log(response.data.products);
                    setProducts([...Products, ...response.data.products])
                }else{
                    setProducts(response.data.products);
                }
                setPostSize(response.data.postSize);
                
            }else{
                alert('Failed to fetch products')
            }
        })
    }

   
    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const onLoadMore = ()=>{
        let skip = Skip + Limit;
        let payload = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(payload)

        setSkip(skip);
    }

    const showFilteredResults = (filters)=>{
        const payload = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(payload);
        setSkip(0);

    }

    const handlePrice =(value)=>{
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }

        console.log('array', array);
        return array;

    }

    const handleFilters = (filters, category)=>{
        console.log(filters);
        const newFilters = {...Filters }
        newFilters[category] = filters; // newFilters['continents'] = [selected checkbox ]
        console.log(newFilters);
        if(category === 'price'){
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues; // newFilters['price'] = [selected  price checkbox ]
        }

        showFilteredResults(newFilters)
        setFilters(newFilters);

    }

    const updateSearchTerms = (newSerachTerms)=>{
        const payload = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSerachTerms
        }
        setSkip(0);
        setSearchTerm(newSerachTerms);
        getProducts(payload);
        
    }
    // console.log(Products);
    return (
        <div style={{ width: '75%', margin: '2rem auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <h1 style={{ textAlign: 'center'}}>Hey Where would you Travel</h1>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                     {/* Filter */}
                    <CheckBox 
                        handleFilters ={filters => handleFilters(filters, 'continents')}
                    />
                </Col>
                <Col lg={12} xs={24}>
                   
                    <RadioBox
                        handleFilters ={filters => handleFilters(filters, 'price')}
                    />
                </Col>
            </Row>

             {/* serach */}
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchBox
                    handleSearch={updateSearchTerms}
                />
            </div>
           

            

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }

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
