import { useState } from "react";
import { Nav, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import alt from '../../assets/image/draw2.webp';

const SearchBar = () =>{
    const [inputText, setInputText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const products = useSelector((state) => state.products.products);
    const navigate=useNavigate();

    const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(inputText.toLowerCase())
    );

    const handleClick = (item)=>{
        navigate(`/shop/${item.name}`)
        setInputText('');
        setIsSearching(false);
    }

    const handleSearch = (e) => {
        setInputText(e.target.value);
    
        if (e.target.value) {
          setIsSearching(true); // Bật trạng thái tìm kiếm khi có nội dung
        } else {
          setIsSearching(false); // Tắt trạng thái tìm kiếm khi không có nội dung
        }
      }

    return (
        <>
            <Nav className={`search-container ${isSearching ? 'active' : ''}`}>
                <Form className="d-flex search-bar">
                    <Form.Control
                    type="search"
                    placeholder="Tìm Kiếm"
                    className=" search-input"
                    aria-label="Search"
                    value={inputText}
                    onChange={(e) => handleSearch(e)}
                    />
                    <Button className='search-btn' variant="outline-success"><i class="fa-solid fa-magnifying-glass"></i></Button>
                </Form>
                <ul className='search-list'>
                    {isSearching && filteredProducts.map((item) => (
                        <li onClick={()=> handleClick(item)} key={item.id}><img alt="" src={item.image[0]?.image || alt}/> 
                        <span>{item.name}<br/>{item.price}₫<br/>Brand: {item.brand}</span>
                        </li>
                        ))}
                </ul>
            </Nav>
        </>
    )
}

export default SearchBar;