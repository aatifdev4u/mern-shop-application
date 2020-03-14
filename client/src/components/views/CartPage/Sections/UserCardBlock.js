import React from 'react'

function UserCardBlock(props) {


    const removeItem=(productId)=>{
        props.removeItem(productId)

    }


    const renderCartImage = (images)=>{
        if(images.length){
            let image = images[0];
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = ()=>(
        props.products && props.products.map((product)=> (
            <tr key={product.id}>
                <td>
                    <img alt="product" src={renderCartImage(product.images)} style={{ width: '70px'}}/>
                </td>
                <td>{product.quantity}</td>
                <td>$ {product.price}</td>
                <td><button onClick={()=>removeItem(product._id)}>Remove</button></td>
            </tr>
        ))
    )
    console.log(props.products);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>

        </div>
    )
}

export default UserCardBlock
