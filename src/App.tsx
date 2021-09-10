import {useContext,useEffect,useState,useReducer} from 'react';
import { useQuery } from 'react-query';
// Components
import  Drawer  from '@material-ui/core/Drawer';
import  LinearProgress  from '@material-ui/core/LinearProgress';
import  Grid  from '@material-ui/core/Grid';
import  AddShopingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from   '@material-ui/core/Badge'
import Item from './Items/Item';
import Cart from './Cart/Cart'
import {AiOutlineShoppingCart} from 'react-icons/ai'
// styles
import { Wrapper,StyledButton } from './App.styles';
import react from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// types
export type CartItemType ={
  id: number,
  category: string,
  description: string,
  image:string,
  price: number,
  title: string,
  amount: number
}
toast.configure();
const getProducts = async (): Promise<CartItemType[]> => await(await fetch('https://fakestoreapi.com/products')).json();
const App = () => {
  const {data, isLoading ,error} = useQuery<CartItemType[]>('products',getProducts);
  const [cartOpen, setCartOpen] = useState(false as boolean);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[])=> 
    items.reduce((ack:number, item ) => ack + item.amount,0);
  
  const handleAddToCart = (clickedItem:CartItemType)=> {
    toast.success('added to cart',{position:toast.POSITION.TOP_CENTER,autoClose:2222});
    setCartItems(prev=> {
      const isItemInCart = prev.find(item=> item.id ===clickedItem.id);
      if(isItemInCart){
        return prev.map(item=> (
          item.id===clickedItem.id ? {...item,amount: item.amount +1 }: item
        ))
      }
      return[...prev,{...clickedItem,amount:1}]
    })
  };
  const handleRemoveFromCart = (id:number)  => {
     
    setCartItems(prev=>(
      prev.reduce((ack,item ) =>{
        if(item.id ===id ){
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount-1}]
        } else {
          return [...ack, item];
        }
      },[] as CartItemType[])
    ))
    toast.error('Removed from cart',{position:toast.POSITION.TOP_CENTER,autoClose:2222});
  }; 
  if(isLoading) return <LinearProgress variant="indeterminate" color="secondary"/>
  if(error) return <div>Something wrong</div> 
  return (
    
     <Wrapper>
       <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)} >
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} ></Cart>
       </Drawer>
       <StyledButton onClick={()=> setCartOpen(true)}><Badge badgeContent={getTotalItems(cartItems)} color='error'><AddShopingCartIcon/></Badge></StyledButton>
        <Grid container spacing={3}>
          {
            data?.map(item => (<Grid item key={item.id} xs={12} sm={4}>

              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid> ))
          }
        </Grid>
     </Wrapper>
  );
}

export default App;
