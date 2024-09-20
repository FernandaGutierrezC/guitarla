import Header  from "./componentes/Header"
import Guitar from "./componentes/Guitar"
import { useState, useEffect } from "react"
import { db } from "./data/db"

function App() {
    
const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

    //const [auth, setAuth] = useState(false) //hook
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const Max_Items = 5
    const Min_Items = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    //función para actualizar la cantidad de items
    function addToCart(item){
        const itemExists=cart.findIndex(guitar=>guitar.id === item.id)
        if(itemExists >= 0){//existe en el carrito
            if(cart[itemExists].quantity >= Max_Items) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else { //agrega el elemento con valor de 1 si no existe
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart=>prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
        const uptdatedCart = cart.map(item =>{
            if(item.id === id && item.quantity < Max_Items){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(uptdatedCart)
    }

    function decreaseQuantity(id){
        const uptdatedCart = cart.map(item =>{
            if(item.id === id && item.quantity > Min_Items){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(uptdatedCart)
    }

    function clearCart(){
        setCart([])
    }

  return (
    <>
    <Header
        cart={cart}//prop
        removeFromCart={removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
    /> {/*Sintaxis de componentes*/}
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                />                
            ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App