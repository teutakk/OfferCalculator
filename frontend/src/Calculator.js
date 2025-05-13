import React, { useEffect, useState } from 'react'
import './Calculator.scss'
import logo from './sgm.jpg'

const Calculator = () => {

    
  const data = [
    {
      id:1,
      productName: "Produkti 1",
      productDescription: "This is a description of product 1",
      productPrice: 100
    },
    {
      id:2,
      productName: "Produkti 2",
      productDescription: "This is a description of product 2",
      productPrice: 15
    },
    {
      id:3,
      productName: "Produkti 3",
      productDescription: "This is a description of product 3",
      productPrice: 5
    },
    {
      id:4,
      productName: "Produkti 4",
      productDescription: "This is a description of product 4",
      productPrice: 10
    },
    {
      id: 5,
      productName: "Produkti 5",
      productDescription: "This is a description of product 5",
      productPrice: 20
    },
    {
      id: 6,
      productName: "Produkti 6",
      productDescription: "This is a description of product 5",
      productPrice: 25
    },
    {
      id: 7,
      productName: "Produkti 7",
      productDescription: "This is a description of product 5",
      productPrice: 12
    },
    {
      id: 8,
      productName: "Produkti 8",
      productDescription: "This is a description of product 5",
      productPrice: 20
    },
    
  ]

  const [productOnList, setProductOnList] = useState(() => {
    const saved = localStorage.getItem("offerList");
    return saved ? JSON.parse(saved) : [];
  });

  const [addedProductsId, setAddedProductsId] = useState([]);


    const handleAddToList = (product) => {

        const exists = productOnList.find((item) => item.id === product.id)

        if (!exists){
            setProductOnList([...productOnList, {...product, quantity: 1, total: product.productPrice}])
            
            setAddedProductsId([...addedProductsId, product.id])
        }
        console.log(productOnList)
    }


    useEffect(() => {

      let savedList = [];
      try {
        
        const saved = localStorage.getItem("offerList");
  
        if (saved) {
          setProductOnList(JSON.parse(saved));
        }

        savedList = JSON.parse(localStorage.getItem("offerList"));
  
        const productIds = savedList.map(p => p.id);
  
        setAddedProductsId(productIds);
      } catch (error) {
        console.error("Failed to parse offerList from localStorage:", error);
        savedList = [];
      }

    }, []);


    useEffect(() => {

      localStorage.setItem("offerList", JSON.stringify(productOnList));

    }, [productOnList]);


    const handleClearList = () => {

      const confirmation = window.confirm("A jeni te sigurt qe doni te fshini listen?");
      
      if (confirmation) {

        localStorage.removeItem("offerList")
  
        setProductOnList([])
        setAddedProductsId([])
      }
    }


    const handleRemoveItem = (id) => {

      const savedList = JSON.parse(localStorage.getItem("offerList")) || [];

      const updatedList = savedList.filter(item => item.id !== id);

      localStorage.setItem("offerList", JSON.stringify(updatedList));

      setProductOnList(updatedList)
      setAddedProductsId(addedProductsId.filter((productId) => productId !== id))
    }

    const increaseQuantity = (id) => {  

      const updatedListItems = productOnList.map((product) => {

        if(product.id === id){
          return {...product, quantity: product.quantity + 1, total: product.productPrice * (product.quantity + 1)}
        }

        return product 
      })
      setProductOnList(updatedListItems)
    }

    const decreaseQuantity = (id) => {
      const updatedListItems = productOnList.map((product) =>{
        if(product.id === id && product.quantity > 1){
          return {...product, quantity: product.quantity - 1, total: product.productPrice * (product.quantity - 1)}

        }
        return product
      })
      setProductOnList(updatedListItems)
    }

    const totalPrice = () => {

      let total = []

      let sum = 0;

        for (let i = 0; i < productOnList.length; i++){

          total.push(productOnList[i].total)

          sum = productOnList[i].total + sum  
        }

      return sum;
    }

  return (
    <div className='calculator'>
        <div className='app-header'>
            <h1>Offer Calculator</h1>
            <img src={logo} alt="logo" className='logo'/>
        </div>
            <div className='main'>
              <div className='product-list'>

                {data.map((product) =>{
                    return (
                  <div key={product.id} className='product-card'>
                    <p>{product.productName}</p>
                    <button className='add-to-cart' disabled={addedProductsId.includes(product.id)}  onClick={() => handleAddToList(product)}>Shto Ne Liste</button>
                  </div>
                    )})
                } 
              </div>
              <div className='added-products'>
                <table className='table' id='print-area'>
                  <thead className='table-header'>
                    <tr className='table-header-row'>
                      <th>Produkti</th>
                      <th>Çmimi</th>
                      <th>Sasia</th>
                      <th>Totali</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className='table-body'>
                  {productOnList.map((product) => (
                    <tr key={product.id} className='table-body-row'> 
                      <td>{product.productName}</td>
                      <td>{product.productPrice}€</td>
                      <td className='quantity'>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                        {product.quantity}
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                      </td>
                      <td>{product.total}€</td>
                      <td>
                        <button className='remove-item' onClick={() => handleRemoveItem(product.id)}>Largo</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Çmimi Gjithsej:</td>
                    <td colSpan="2">{totalPrice()}€</td>
                  </tr>
                </tfoot>
              </table>
            </div>  
        </div>
        <div className='buttons'>
          <button className='print' onClick={() => window.print()}>Printo Ofertën</button>
          <button className='delete' onClick={handleClearList}>Fshije Tabelen</button>
        </div>
    </div>
  )
}

export default Calculator