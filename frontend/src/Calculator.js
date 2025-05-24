import React, { useEffect, useState } from 'react'
import './Calculator.scss'
import logo from './sgm.jpg'

const Calculator = () => {

    
  const data = [
    {
      id:1,
      productName: "DVR 2mp 4ch",
      productDescription: "This is a description of product 1",
      productPrice: 55
    },
    {
      id:2,
      productName: "DVR 2mp 8ch",
      productDescription: "This is a description of product 2",
      productPrice: 70
    },
    {
      id:3,
      productName: "DVR 5MP 4ch",
      productDescription: "This is a description of product 3",
      productPrice: 75
    },
    {
      id:4,
      productName: "DVR 5mp 8ch",
      productDescription: "This is a description of product 4",
      productPrice: 95
    },
    {
      id: 5,
      productName: "DVR 8mp 4ch",
      productDescription: "This is a description of product 5",
      productPrice: 100
    },
    {
      id: 6,
      productName: "DVR 8mp 8ch",
      productDescription: "This is a description of product 5",
      productPrice: 150
    },
    {
      id: 7,
      productName: "CAM 2mp",
      productDescription: "This is a description of product 5",
      productPrice: 33
    },
    {
      id: 8,
      productName: "CAM 2mp COLOR",
      productDescription: "This is a description of product 5",
      productPrice: 40
    },
    {
      id: 9,
      productName: "CAM 5mp",
      productDescription: "This is a description of product 5",
      productPrice: 40
    },
    {
      id: 10,
      productName: "CAM 5mp Color",
      productDescription: "This is a description of product 5",
      productPrice: 46
    },
    {
      id: 11,
      productName: "CAM 8mp",
      productDescription: "This is a description of product 5",
      productPrice: 57
    },
    {
      id: 12,
      productName: "CAM 8mp Color",
      productDescription: "This is a description of product 5",
      productPrice: 70
    },
    {
      id: 13,
      productName: "CAM 8mp Color Alarm",
      productDescription: "This is a description of product 5",
      productPrice: 150
    },
    {
      id: 14,
      productName: "Trafo",
      productDescription: "This is a description of product 5",
      productPrice: 15
    },
    {
      id: 15,
      productName: "Kabllo 100m",
      productDescription: "This is a description of product 5",
      productPrice: 45
    },
    {
      id: 16,
      productName: "BNC",
      productDescription: "This is a description of product 5",
      productPrice: 1
    },
    {
      id: 17,
      productName: "DC",
      productDescription: "This is a description of product 5",
      productPrice: 1
    },
    {
      id: 18,
      productName: "OG",
      productDescription: "This is a description of product 5",
      productPrice: 1
    },
    {
      id: 19,
      productName: "HDD 1TB REFORB",
      productDescription: "This is a description of product 5",
      productPrice: 50
    },
    
  ]

  const [productOnList, setProductOnList] = useState(() => {
    const saved = localStorage.getItem("offerList");
    return saved ? JSON.parse(saved) : [];
  });

  const [addedProductsId, setAddedProductsId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
              <label>Kërko Produktin:</label>
              <input className='input' type="text" placeholder="Kërko..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <div className='product-list'>
                {data.filter((product) => {
                  return product.productName.toLowerCase().includes(searchQuery.toLowerCase());
                }).map((product) =>{
                  return (
                    <div key={product.id} className='product-card'>
                      
                    <p>{product.productName}</p>
                    {/* <p>{product.productPrice}</p> */}
                    {!(addedProductsId.includes(product.id)) && <button className='add-to-cart' disabled={addedProductsId.includes(product.id)}  onClick={() => handleAddToList(product)}>Shto Ne Liste</button>}
                    {(addedProductsId.includes(product.id)) && <button className='remove-item-list' onClick={() => handleRemoveItem(product.id)}>Largo</button>}

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
                      <td className='product-column'>{product.productName}</td>
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
          <button className='delete' disabled={productOnList.length === 0} onClick={handleClearList}>Fshije Tabelen</button>
        </div>

        <footer className='footer'>
          <p>Copyright @{new Date().getFullYear()}</p>
          <p>Designed by <span>TK</span></p>
          </footer>
    </div>
  )
}

export default Calculator