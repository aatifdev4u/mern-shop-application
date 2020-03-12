import React, {useState}from 'react';
import{ Typography, Button, Form, message, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';


const { Title } = Typography;
const { TextArea } = Input;



const Continents = [
    {key: 1, value: "Asia"},
    {key: 2, value: "Africa"},
    {key: 3, value: "Australia"},
    {key: 4, value: "Europe"},
    {key: 5, value: "North America"},
    {key: 6, value: "South America"},
    {key: 7, value: "Antartica"}
]

export default function UploadProductPage(props) {
    
    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([]);

    const onTitleChange = (event)=>{
        setTitleValue(event.currentTarget.value);
    }

    const onDescriptionChange = (event)=>{
        setDescriptionValue(event.currentTarget.value);
    }

    const onPriceChange = (event)=>{
        setPriceValue(event.currentTarget.value);
    }

    const onContinentChange = (event)=>{
        setContinentValue(event.currentTarget.value);
    }

    const updateImages = (image)=>{
        // console.log(image);
        setImages(image);
    }

    const onSubmit =(event)=>{
        console.log('Onsubmit is called');
        event.preventDefault();
        const payload = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue
        }
        console.log(payload);

        // check whether all the fields are fileds or not
        if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images ){
            return alert('Please Fill all the fields');
        }




      

        Axios.post('/api/product/uploadProduct', payload)
        .then(response => {
            if(response.data.success){
                alert('Product succesfully uploaded');
                props.history.push('/');
            }else{
                alert('Failed to upload Product');
            }
        })
    }

    return (
        <div>
           
            <div style={{ maxWidth: '700px',  margin: '2rem auto'}}>
                <div style={{ textAlign: "center", marginBottom: "2rem"}}>
                    <Title level="2">Upload Product Page</Title>
                </div>
                
                <Form >
                     {/* dropzone */}
                     <FileUpload
                        refreshFunction={updateImages}
                     />
                    <br/>
                    <br/>
                   <label>Title</label>
                   <Input
                        onChange={onTitleChange}
                        value={TitleValue}
                   />
                   <br/>
                   <br/>
                   <label>Description</label>
                   <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                   />
                   <br/>
                   <br/>
                   <label>Price($)</label>
                   <Input
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
                   />
                    <br/>
                   <br/>
                   <label>Select Continent</label>
                   <select onChange={onContinentChange}>
                       {
                           Continents.map((item)=>{
                           return <option key={item.key} value={item.key}>{item.value}</option>
                           })
                       }
                   </select>
                   <br/>
                   <br/>
                   <Button onClick={onSubmit} >Submit</Button>
                </Form>
            </div>
        </div>
    )
}
