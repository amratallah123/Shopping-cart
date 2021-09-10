import  Button  from "@material-ui/core/Button";
//types
import { CartItemType } from "../App";
//Styles
import { Wrapper } from "./item.style";
type Props  = {
    item:CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;   
}

 const Item:React.FC<Props> = ({item,handleAddToCart}) => {
    
    return (
        <div>
             <Wrapper>
         <img src={item.image} alt ={item.title}/>
         <div>
             <h2>{item.title}</h2>
             <p>{item.description}</p>
             <h3>${item.price}</h3>
         </div>
         <Button onClick={()=>handleAddToCart(item)}> Add To Cart</Button>
     </Wrapper>
        </div>
    )
}
export default Item;