// ! main file

const getUser = document.querySelector('#user') as HTMLInputElement;
const btn = document.querySelector("#btn") as HTMLFormElement;
const searchBox = document.querySelector("#searchBox") as HTMLElement;
const col_sm = document.querySelector(".col-sm") as HTMLElement;

// * Interface

interface UserData {
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}
const fetchApiFun = async <T>(url:string,options?:RequestInit):Promise<T>=>{
   const res = await fetch(url,options);
   if(!res.ok){
    throw new Error(`Here is some error ${res.status}`)
   }else{
   return await res.json();
}
};
// * display result
const showResultUI = (singleUser:UserData)=>{
    if(singleUser){
        const {avatar_url,login,url,location,id}= singleUser;
        col_sm.insertAdjacentHTML("beforeend",`<div class="card">
         <img src=${avatar_url} alt=${login}>
         <hr class="he">
         <div class="footer">
         <img class="icon" src=${avatar_url} alt=${login}>
         <a href=${url}>Github</a>
         </div>
        </div>`)
    }
}
// * default function
const fetchData = (url:string)=>{
    fetchApiFun<UserData[]>(url,{}).then((res)=>{
        for(const user of res){
            showResultUI(user);
        }
    });
}
fetchData("https://api.github.com/users")

// * seaarch fun
searchBox.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const  searchOut = getUser.value.toLocaleLowerCase()
    try {
        const url = "https://api.github.com/users";
        const searchRes= await fetchApiFun<UserData[]>(url,{});
        const matchUser = searchRes.filter((user)=>{
            return user.login.includes(searchOut);
        })
        if(matchUser.length === 0){
            col_sm.innerHTML = ``;
            col_sm.insertAdjacentHTML('beforeend',`<p class="msg">Nothing found</p>`)
        }else{
            col_sm.innerHTML = ``;
            for(const data of matchUser){
                showResultUI(data)
            }
        }
    } catch (error) {
        console.log(new Error(`${error}`));
    }
})


