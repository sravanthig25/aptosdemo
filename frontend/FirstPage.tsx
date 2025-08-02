import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function FirstPage() {
    const[name, setname] = useState("");
    const[address, setaddress] = useState("");
    const[password, setpassword] = useState("");

    useEffect(() => {
        checkConnection()
    }, []);

    async function checkConnection() {
        const isConnected = await window.aptos.isConnected();
        console.log("Is connected:", isConnected);
        if (!isConnected) {
            alert("you are not connected to the wallet, redirecting to main page");
            console.log("Not connected, redirecting to home page.");
            navigate("/");
        } else {
            var add = await window.aptos.account();
            console.log("Account address:", add?.address);
        }
    }

    var navigate = useNavigate();

    async function Disconnfun() {
        window.aptos.disconnect();
        navigate("/");
    }
    function submitfun(){
        console.log("Name:", name);
        console.log("Address:", address);
        console.log("Password:", password);
    }



    return (
        <div>
            <form>
                <label htmlFor="name">Enter your name:</label>
                <input type="text" id="name" required onChange={e=> setname(e.target.value)} /><br></br>
                <label htmlFor="address">Enter your address:</label>
                <input type="text" id="address" required onChange={e=> setaddress(e.target.value)} /><br></br>  

                <input type="password" placeholder="Enter your password" id="password" required onChange={e=> setpassword(e.target.value)} /><br></br>
                <button type="button" onClick={submitfun}>Submit</button>
            </form>
            <button onClick={Disconnfun}>Disconnect</button>
        </div>
    )
}