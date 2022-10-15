import React, { useState } from 'react'
import Select from 'react-select'
const AddProduct = ({ product, add, selectedProducts }) => {


    const Percentages = [
        { value: 0.00, label: 0.00 },
        { value: 5.00, label: 5.00 },
        { value: 10.00, label: 10.00 },
        { value: 15.00, label: 15.00 },
        { value: 20.00, label: 20.00 },
        { value: 25.00, label: 25.00 },
        { value: 30.00, label: 30.00 },
        { value: 35.00, label: 35.00 },
        { value: 40.00, label: 40.00 },
        { value: 45.00, label: 45.00 },
        { value: 50.00, label: 50.00 },
        { value: 60.00, label: 60.00 },
        { value: 65.00, label: 65.00 },
        { value: 70.00, label: 70.00 },
        { value: 75.00, label: 75.00 },
        { value: 80.00, label: 80.00 },

    ]
    const [percentage, setpercentage] = useState(Percentages[0]);
    const ProductToAdd = {
        Product_Name: product && product.Product_Name,
        Product_ID: product && product.Product_ID,
        Category: product && product.Category,
        Percentage: product && percentage.value
    }
    const alreadyPresent = (id) => {
        for(let i = 0; i < selectedProducts.length; i++){
            if (selectedProducts[i].Product_ID === id) return true;
        }
        return false;
    }
    const addProduct = (product) => {
        if (alreadyPresent(product.Product_ID)) {
            return;
        }
       add(product)
    }
    return (
        <div className='single_product_'>
            <div className='product_name_'>
                <input type='radio' value={product && product.Product_Name} id={product && product.Product_Name} name={product && product.Product_Name} onClick={(e) => { addProduct(ProductToAdd) }} />
                <label htmlFor={product && product.Product_Name}>{product && product.Product_Name}</label>
            </div>
            <div className='product_percentage_'>
                <Select
                    defaultValue={percentage}
                    onChange={setpercentage}
                    options={Percentages}
                    className='select'
                />
            </div>
        </div >
    )
}

export default AddProduct
