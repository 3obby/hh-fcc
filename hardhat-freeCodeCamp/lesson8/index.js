import {ethers} from "./ethers.js"
import {abi, address} from "./constants.js"

const btnConnect = document.getElementById("btnConnect")
const btnFund = document.getElementById("btnFund")

btnConnect.onclick = connect
btnFund.onclick = fund

async function connect() {
    if(typeof window.ethereum !== "undefined"){
        await window.ethereum.request({method:"eth_requestAccounts"})
        document.getElementById("btnConnect").innerHTML = "connected"
    }
    else{
        document.getElementById("btnFund").innerHTML = "install metamask"
    }
}

async function fund(){
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        const resp = await contract.fund({value: ethers.utils.parseEther("0.01")})
        console.log(signer);
        
    }
}