// ERC721, ERC1155 or EIP4907
const CONTRACT_TYPE = {
    ERC721: 0, //for small collection
    ERC1155: 1, //for tall collection
    EIP4907: 2 //for rent/buy nft
}

//EIP
//const contractType=CONTRACT_TYPE.EIP4907;
//const contractAdress = "0xc26e879A9b03E87465a96dAcCC2f3431b0F1090E";

//ERC721
const contractType=CONTRACT_TYPE.ERC721;
//const contractAdress = "0x797a6181D358bbD6646E2FA396d6135b8e73a099";
const contractAdress = "0xB6CDB8e74D08C4fC52E7b967438ec53A7ae8Ed78";



const textHeader="Discover the power of NFT! Purchase or rent to use dedicated service";

const prefixLinkTransaction="https://rinkeby.etherscan.io/tx/";

const prefixNftStoreIpfs="https://gateway.pinata.cloud/ipfs/";
const jsonCID="Qmf8HbWaXaYKrkzaXAFf2oMMAHJuyuVvc7ZUtugESK1LK7";

const nameOfCurrentProject= "NFT Launchpad";

const chaineName="Rinkeby";
const chainId="0x4";

const webhookMail="";

const walletAdrEnableToAccordingRent="0x3534916fB6831b6C6d2e843974d1D4351eb63ce8";

const story=[
    {
        title:"2020 - Creation of Concept",
        content: "ipsum dolor sit amet. Et quasi voluptate est quia illo sed vitae omnis? Est excepturi obcaecati eos ipsam reprehenderit id minima sapiente eos sapiente autem eos quam iste.Vel reiciendis sequi et iste ducimus et molestias natus! Et voluptatem aspernatur et possimus galisum sed iure inventore. Hic facilis laudantium est "
    },
    {
        title:"2021 - Test the concept",
        content: "ipsum dolor sit amet. Et quasi voluptate est quia illo sed vitae omnis? Est excepturi obcaecati eos ipsam reprehenderit id minima sapiente eos sapiente autem eos quam iste.Vel reiciendis sequi et iste ducimus et molestias natus! "
    }
];

const main=[
    {
        position:1,
        img:'https://www.youlovewords.com/wp-content/uploads/2021/05/0_Guide_Landing_Page-uai-258x258.png',
        title:"New Concept is coming",
        content: "Lorem ipsum dolor sit amet. Et quasi voluptate est quia illo sed vitae omnis? Est excepturi obcaecati eos ipsam reprehenderit id minima sapiente eos sapiente autem eos quam iste.Vel reiciendis sequi et iste ducimus et molestias natus! Et voluptatem aspernatur et possimus galisum sed iure inventore. Hic facilis laudantium est dolores modi et distinctio incidunt et commodi omnis ut voluptatum error?Est expedita inventore et dolorem omnis aut repellendus enim ea inventore sint ex atque quidem in omnis rerum? Hic veniam veniam ea vero ipsum et veritatis dicta ex quasi delectus in earum corrupti ut velit cumque quo autem pariatur. Ad aliquid quod ab dolores quibusdam quo ipsa quia 33 culpa tenetur qui blanditiis sequi id molestiae repellat sit repellat blanditiis? 33 mollitia veniam est praesentium autem aut magnam libero id amet aperiam!"
    },
    {
        position:2,
        img:'https://www.youlovewords.com/wp-content/uploads/2021/05/0_Guide_Landing_Page-uai-258x258.png',
        title:"It's time to change",
        content: "Lorem ipsum dolor sit amet. Et quasi voluptate est quia illo sed vitae omnis? Est excepturi obcaecati eos ipsam reprehenderit id minima sapiente eos sapiente autem eos quam iste.Vel reiciendis sequi et iste ducimus et molestias natus! Et voluptatem aspernatur et possimus galisum sed iure inventore. Hic facilis laudantium est dolores modi et distinctio incidunt et commodi omnis ut voluptatum error?Est expedita inventore et dolorem omnis aut repellendus enim ea inventore sint ex atque quidem in omnis rerum? Hic veniam veniam ea vero ipsum et veritatis dicta ex quasi delectus in earum corrupti ut velit cumque quo autem pariatur. Ad aliquid quod ab dolores quibusdam quo ipsa quia 33 culpa tenetur qui blanditiis sequi id molestiae repellat sit repellat blanditiis? 33 mollitia veniam est praesentium autem aut magnam libero id amet aperiam!"
    },
    {
        position:1,
        img:'https://www.youlovewords.com/wp-content/uploads/2021/05/0_Guide_Landing_Page-uai-258x258.png',
        title:"Discover new world",
        content: "Lorem ipsum dolor sit amet. Et quasi voluptate est quia illo sed vitae omnis? Est excepturi obcaecati eos ipsam reprehenderit id minima sapiente eos sapiente autem eos quam iste.Vel reiciendis sequi et iste ducimus et molestias natus! Et voluptatem aspernatur et possimus galisum sed iure inventore. Hic facilis laudantium est dolores modi et distinctio incidunt et commodi omnis ut voluptatum error?Est expedita inventore et dolorem omnis aut repellendus enim ea inventore sint ex atque quidem in omnis rerum? Hic veniam veniam ea vero ipsum et veritatis dicta ex quasi delectus in earum corrupti ut velit cumque quo autem pariatur. Ad aliquid quod ab dolores quibusdam quo ipsa quia 33 culpa tenetur qui blanditiis sequi id molestiae repellat sit repellat blanditiis? 33 mollitia veniam est praesentium autem aut magnam libero id amet aperiam!"
    }
];

const enableMint=true;
const mintTitle="Title for mint";
const mintContentText="Text to explain Mint <a href='toto'>itit</a>";
const mintUrlImg="https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png";

const allNft=[
    {
        id:1,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        price: "10",
        content: "Un contenu",
        token: "Eth"
    },
    {
        id:2,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        price: "10",
        content: "Un contenu",
        token: "Eth"
    },
    {
        id:3,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        content: "Un contenu",
        price: "10",
        token: "Eth"
    },
    {
        id:4,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        price: "10",
        token: "Eth"
    },
    {
        id:5,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        price: "10",
        token: "Eth"
    },
    {
        id:6,
        img:'https://gateway.pinata.cloud/ipfs/QmX2vgTtQKy4JF6wUCVYMzwAwtitG1w2UetVSNW7qS1y8P/1.png',
        title:"Un titre",
        price: "10",
        token: "Eth"
    },

];

export {contractAdress, textHeader, story, 
    nameOfCurrentProject, webhookMail, chainId, chaineName, main,
    enableMint, mintTitle, mintContentText, mintUrlImg,
    allNft, prefixLinkTransaction, prefixNftStoreIpfs, jsonCID,
    walletAdrEnableToAccordingRent, contractType, CONTRACT_TYPE
}