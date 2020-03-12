import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay dots={false}>
                    {
                        props.images.map((image)=>(
                            <div>
                                <img style={{width: '100%', height: '120px'}} src={`http://localhost:5000/${image}`}/>
                            </div>
                        ))
                    }
            </Carousel>
        </div>
    )
}

export default ImageSlider
