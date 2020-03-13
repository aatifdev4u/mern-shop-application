import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    console.log('Aatif');
    return (
        <div>
            <Carousel autoplay dots={false}>
                    {
                        props.images && props.images.map((image, index)=>(
                            <div key={index}>
                                <img style={{width: '100%', height: '120px'}} src={`http://localhost:5000/${image}`} alt="productImage"/>
                            </div>
                        ))
                    }
            </Carousel>
        </div>
    )
}

export default ImageSlider
